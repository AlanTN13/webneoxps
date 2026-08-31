import { afterEach, describe, expect, it } from "vitest";
import handler from "../../api/radar-decisions.mjs";

const originalEnvironment = {
  repository: process.env.RADAR_HISTORY_REPOSITORY,
  branch: process.env.RADAR_HISTORY_BRANCH,
  token: process.env.RADAR_HISTORY_READ_TOKEN,
};

function responseRecorder() {
  return {
    statusCode: 200,
    headers: {},
    body: "",
    status(code) { this.statusCode = code; return this; },
    setHeader(name, value) { this.headers[name] = value; },
    send(value) { this.body = value; },
  };
}

afterEach(() => {
  for (const [key, value] of Object.entries({
    RADAR_HISTORY_REPOSITORY: originalEnvironment.repository,
    RADAR_HISTORY_BRANCH: originalEnvironment.branch,
    RADAR_HISTORY_READ_TOKEN: originalEnvironment.token,
  })) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

describe("API pública de decisiones de Radar", () => {
  it("falla de forma explícita y sin inventar datos cuando falta la conexión privada", async () => {
    delete process.env.RADAR_HISTORY_REPOSITORY;
    delete process.env.RADAR_HISTORY_BRANCH;
    delete process.env.RADAR_HISTORY_READ_TOKEN;
    const response = responseRecorder();

    await handler({ method: "GET" }, response);

    expect(response.statusCode).toBe(503);
    expect(JSON.parse(response.body)).toEqual({
      status: "unavailable",
      message: "El historial de decisiones todavía no está conectado en este entorno.",
      decisions: [],
    });
    expect(response.body).not.toMatch(/token|secret|credential|github\.com/i);
    expect(response.headers["X-Content-Type-Options"]).toBe("nosniff");
  });

  it("rechaza métodos de escritura", async () => {
    const response = responseRecorder();

    await handler({ method: "POST" }, response);

    expect(response.statusCode).toBe(405);
    expect(response.headers.Allow).toBe("GET");
  });
});
