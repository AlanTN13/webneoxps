const repository = process.env.GITHUB_REPOSITORY || "AlanTN13/webneoxps";
const branch = process.env.RADAR_HISTORY_BRANCH || "radar-history";
const token = process.env.GH_TOKEN;

async function api(endpoint) {
  const response = await fetch(`https://api.github.com/repos/${repository}${endpoint}`, {
    headers: {
      accept: "application/vnd.github+json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      "x-github-api-version": "2022-11-28",
    },
  });
  const body = await response.json().catch(() => null);
  if (!response.ok) throw new Error(body?.message || `GitHub API respondió ${response.status}`);
  return body;
}

async function main() {
  const requestedRunId = process.argv[2] && process.argv[2] !== "--list" ? process.argv[2] : null;
  const ref = await api(`/git/ref/heads/${encodeURIComponent(branch)}`);
  const tree = await api(`/git/trees/${ref.object.sha}?recursive=1`);
  const records = (tree.tree || [])
    .filter((entry) => entry.type === "blob" && /^no-publication\/[a-z0-9][a-z0-9._-]{5,80}\.json$/.test(entry.path))
    .sort((left, right) => right.path.localeCompare(left.path));
  if (!requestedRunId) {
    console.log(JSON.stringify(records.map(({ path, sha, size }) => ({ path, sha, size })), null, 2));
    return;
  }
  const entry = records.find((record) => record.path.endsWith(`/${requestedRunId}.json`));
  if (!entry) throw new Error(`No existe NO_PUBLICATION para ${requestedRunId}`);
  const blob = await api(`/git/blobs/${entry.sha}`);
  console.log(Buffer.from(String(blob.content || "").replace(/\s/g, ""), "base64").toString("utf8").trim());
}

main().catch((error) => {
  console.error(`radar:v3:history ERROR — ${error.message}`);
  process.exitCode = 1;
});
