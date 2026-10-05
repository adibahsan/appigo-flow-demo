# Brief: Rush Discount

*From: Business team · To: Development · Status: raw, not yet grilled*

## Why

The Rush app is our new channel for selling tickets to selected Events. We want people to try it, and the simplest pull is a discount: buy through Rush and you pay less. The business team picks which Events are on Rush.

## What we want

- An Order for an Event that is on Rush gets **10% off**.
- Nobody should have to enter a code. The discount just appears.
- One discount **per person, per Event**. We don't want someone to split a big purchase into lots of small Orders and get the discount on each one.
- The discount should be **visible on the receipt**, so the buyer sees what they saved.

## What we know

- Prices are per ticket type, and an Order can have several ticket types for one Event.
- Today the price is simply quantity × unit price per line, added up.
- Finance will settle who pays for the discount (us or the organiser) separately. That's not part of this work.

## What we haven't decided

We know this brief has gaps. Please grill us before building anything.

## Done looks like

- A Rush Order shows the discount and the lower total.
- A second Order by the same person for the same Event doesn't get it again.
- Everything else prices exactly as it does today.
