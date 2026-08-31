import assert from "node:assert/strict";
import test from "node:test";
import { realCases } from "../../src/data/cases.js";
import { solutions, systemSteps } from "../../src/data/solutions.js";

test("publishes the six approved solution routes", () => {
  assert.deepEqual(
    solutions.map(({ slug }) => slug),
    ["captacion", "crm", "agentes-ia", "automatizacion", "data-analytics", "desarrollo"],
  );
});

test("keeps each solution commercially complete and distinct", () => {
  assert.equal(new Set(solutions.map(({ statement }) => statement)).size, solutions.length);

  for (const solution of solutions) {
    assert.ok(solution.problem.length > 60, `${solution.slug} needs a recognizable problem`);
    assert.equal(solution.flow.length, 4, `${solution.slug} needs a four-step flow`);
    assert.ok(solution.capabilities.length >= 5, `${solution.slug} needs concrete capabilities`);
    assert.match(solution.nexy, /^\/assets\/nexis\/.+\.webp$/);
  }
});

test("uses the approved Nexy family across the solution system", () => {
  assert.deepEqual(
    new Set(solutions.map(({ nexy }) => nexy)),
    new Set([
      "/assets/nexis/nexi-growth.webp",
      "/assets/nexis/nexi-sales.webp",
      "/assets/nexis/nexi-ai.webp",
      "/assets/nexis/nexi-flow.webp",
      "/assets/nexis/nexi-core.webp",
    ]),
  );
});

test("the home system explains one connected commercial flow", () => {
  assert.deepEqual(systemSteps.map(({ label }) => label), ["Captación", "CRM", "IA", "Automatización", "Data"]);
  assert.equal(new Set(systemSteps.map(({ state }) => state)).size, systemSteps.length);
});

test("the home proof uses ten anonymized implementation cases", () => {
  assert.equal(realCases.length, 10);
  assert.equal(new Set(realCases.map(({ id }) => id)).size, realCases.length);

  for (const item of realCases) {
    assert.ok(item.sector.length > 5);
    assert.ok(item.title.length > 8);
    assert.ok(item.summary.length > 70);
    assert.ok(item.type.length > 2);
    assert.ok(item.status.length > 7);
    assert.doesNotMatch(`${item.sector} ${item.title} ${item.summary}`, /GlobalTrip|Casa Italia|Edelvives|Sommier Magno/i);
  }
});
