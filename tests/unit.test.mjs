// Unit checks for lib/validation and lib/links (run with: npm run test:unit)
import assert from "node:assert/strict";
import { test } from "node:test";

const { normalisePhone, validate, composeMessage } = await import("../lib/validation.ts");

test("phone normalisation", () => {
  assert.equal(normalisePhone("98765 43210"), "9876543210");
  assert.equal(normalisePhone("+91 98765-43210"), "9876543210");
  assert.equal(normalisePhone("12345"), null);
});

test("parts schema", () => {
  const ok = { name: "Anu", phone: "9876543210", make: "Hyundai", model: "i20", year: "2018", part: "Brake pads", consent: "yes" };
  assert.deepEqual(validate("parts", ok), {});
  const errs = validate("parts", { ...ok, year: "1970", consent: "" });
  assert.ok(errs.year && errs.consent);
  assert.match(composeMessage("parts", ok), /Car: Hyundai i20 2018/);
});
