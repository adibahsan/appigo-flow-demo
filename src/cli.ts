import { priceOrder } from "./pricing.js";
import type { Cents, Order } from "./types.js";

const money = (cents: Cents): string => (cents / 100).toFixed(2);

// Separate, un-annotated const: after Rush Discount lands, `rushListed` is a real Event field.
const event = { id: "evt-1", name: "Rush Night", rushListed: true };
const ticket = { id: "ga", name: "General Admission", unitPrice: 2500 };

const order: Order = {
  account: { id: "acc-1", name: "Acc One" },
  event,
  items: [{ ticket, quantity: 2 }],
};

const priced = priceOrder(order);
const width = 40;
const row = (left: string, right: string): string =>
  left + right.padStart(Math.max(1, width - left.length));

console.log(
  `Order: Account ${order.account.id} · Event "${event.name}"${event.rushListed ? " (Rush-listed)" : ""}`,
);
for (const line of priced.lines) {
  const name = order.items.find((i) => i.ticket.id === line.ticketId)?.ticket.name ?? line.ticketId;
  console.log(
    "  " + row(`${line.quantity} × ${name}   @ ${money(line.unitPrice)}`, money(line.total)),
  );
}
console.log("  " + "─".repeat(width));
if (priced.discountLine) {
  console.log("  " + row("Rush Discount (10%)", money(priced.discountLine.amount)));
}
console.log("  " + row("Total", money(priced.total)));
