import { describe } from "node:test";
import { getCheckoutSession } from "../app/actions/stripe";

describe("getCheckoutSession", () => {
  it("returns error when required fields are missing", async () => {
    const result = await getCheckoutSession({
      name: "Test",
      amount: 100,
      id: 1,
    });

    expect(result).toEqual({
      error: "Name, amount, id and email are required",
    });
  });
});
