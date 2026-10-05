import type { Order, PriceOptions, PricedLine, PricedOrder } from "./types.js";

/** Public seam: prices an Order. Base pricing is quantity x unit price per line, summed. */
export function priceOrder(order: Order, options: PriceOptions = {}): PricedOrder {
  const lines: PricedLine[] = order.items.map(({ ticket, quantity }) => {
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error(`Invalid quantity ${quantity} for ticket ${ticket.id}`);
    }
    return {
      ticketId: ticket.id,
      quantity,
      unitPrice: ticket.unitPrice,
      total: quantity * ticket.unitPrice,
    };
  });
  const subtotal = lines.reduce((sum, line) => sum + line.total, 0);
  const useKey = `${order.account.id}:${order.event.id}`;
  const rushEligible = order.event.rushListed && !options.rushUses?.has(useKey);
  const rushDiscount = rushEligible ? Math.floor(subtotal / 10) : 0;
  if (rushEligible) options.rushUses?.add(useKey);
  return { lines, total: subtotal - rushDiscount };
}
