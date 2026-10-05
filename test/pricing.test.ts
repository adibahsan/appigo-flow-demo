import { describe, expect, it } from "vitest";
import { priceOrder } from "../src/index.js";
import type { Order } from "../src/index.js";

const account = { id: "a1", name: "Ada" };
const event = { id: "e1", name: "Spring Gig" };
const general = { id: "t-general", name: "General", unitPrice: 2500 };
const vip = { id: "t-vip", name: "VIP", unitPrice: 9900 };

const order = (items: Order["items"]): Order => ({ account, event, items });

describe("priceOrder", () => {
  it("prices a single line as quantity x unit price", () => {
    const result = priceOrder(order([{ ticket: general, quantity: 3 }]));
    expect(result).toEqual({
      lines: [{ ticketId: "t-general", quantity: 3, unitPrice: 2500, total: 7500 }],
      total: 7500,
    });
  });

  it("sums several lines into the order total, keeping line order", () => {
    const result = priceOrder(
      order([
        { ticket: general, quantity: 2 },
        { ticket: vip, quantity: 1 },
      ]),
    );
    expect(result.lines.map((l) => l.total)).toEqual([5000, 9900]);
    expect(result.total).toBe(14900);
  });

  it("prices an empty order at zero", () => {
    expect(priceOrder(order([]))).toEqual({ lines: [], total: 0 });
  });

  it("rejects non-positive or fractional quantities", () => {
    expect(() => priceOrder(order([{ ticket: general, quantity: 0 }]))).toThrow(/quantity/i);
    expect(() => priceOrder(order([{ ticket: general, quantity: 1.5 }]))).toThrow(/quantity/i);
  });
});
