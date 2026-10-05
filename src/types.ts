/** All money is integer minor units (cents). */
export type Cents = number;

export interface Event {
  id: string;
  name: string;
  /** Rush-Listed: sold through the Rush app, so it can carry the Rush Discount. */
  rushListed?: boolean;
}

/** A ticket type for an Event, with its unit price. */
export interface Ticket {
  id: string;
  name: string;
  unitPrice: Cents;
}

export interface Account {
  id: string;
  name: string;
}

export interface OrderItem {
  ticket: Ticket;
  quantity: number;
}

/** An Account buying ticket quantities for one Event. */
export interface Order {
  account: Account;
  event: Event;
  items: OrderItem[];
}

export interface PricedLine {
  ticketId: string;
  quantity: number;
  unitPrice: Cents;
  total: Cents;
}

/** A discount shown as its own line; amount is negative. */
export interface DiscountLine {
  description: string;
  amount: Cents;
}

export interface PricedOrder {
  lines: PricedLine[];
  /** Present only when a discount was applied. */
  discountLine?: DiscountLine;
  total: Cents;
}

/** Optional extras for pricing. */
export interface PriceOptions {
  /** Record of Rush Uses, keyed "accountId:eventId". Granting the Rush Discount adds to it. */
  rushUses?: Set<string>;
}
