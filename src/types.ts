/** All money is integer minor units (cents). */
export type Cents = number;

export interface Event {
  id: string;
  name: string;
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

export interface PricedOrder {
  lines: PricedLine[];
  total: Cents;
}
