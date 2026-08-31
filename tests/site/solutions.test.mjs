import assert from "node:assert/strict";
import test from "node:test";
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

test("the home system explains one connected commercial flow", () => {
  assert.deepEqual(systemSteps.map(({ label }) => label), ["Captación", "CRM", "IA", "Automatización", "Data"]);
});
