# Rush Discount: one per account per event

**Status:** ready-for-agent

## Problem Statement

Accounts buying tickets for a Rush-Listed Event get no reward for coming through the app, and the business has no way to offer one without handing out codes that anyone can share or reuse. The team wants an automatic discount for Rush-Listed Events, but an Account must not be able to collect it again and again by splitting their tickets across many Orders.

## Solution

When an Order is for a Rush-Listed Event, the Rush Discount is applied automatically, with no code to enter. It takes 10% off the Order. Each Account receives it at most once per Event: the first Order for that Event gets it and is recorded as a Rush Use, and any later Order from the same Account for the same Event is priced at full price. The discount is shown as its own line in the priced result, so the Account can see what it saved.

## User Stories

1. As an Account, I want the Rush Discount applied automatically on a Rush-Listed Event, so that I don't have to find or type a code
2. As an Account, I want my first Order for a Rush-Listed Event to get the discount, so that I'm rewarded for buying through Rush
3. As an Account, I want an Order for an Event that is not Rush-Listed to be priced exactly as before, so that nothing surprising changes
4. As an Account, I want to see the Rush Discount as its own line in my priced Order, so that I can see how much I saved
5. As an Account, I want the discount amount to be a whole number of cents, so that I'm never charged fractions of a cent
6. As an Account, I want a second Order for the same Event to be priced at full price rather than rejected, so that I can still buy more tickets
7. As an Account, I want to receive the Rush Discount on a different Rush-Listed Event even if I used it on another, so that the limit is per Event
8. As an Account, I want my discount not to be used up by someone else's Order, so that the limit is per Account
9. As the business, I want an Account to get the Rush Discount at most once per Event, so that splitting their tickets across many Orders does not multiply the discount
10. As the business, I want a Rush Use recorded when the discount is granted, so that a second Order for the same Account and Event can be refused the discount
11. As the business, I want an Order that is priced without a record of Rush Uses to still get the discount, so that existing callers keep working
12. As the business, I want an Order with no items to stay at zero, so that an empty Order never shows a discount
13. As a developer, I want the existing way of calling the pricing function to keep working unchanged, so that no existing caller has to be touched
14. As a developer, I want every Rush Discount behaviour testable through the single pricing function, so that tests survive refactoring
15. As a developer, I want the funding split between organiser and Rush left out, so that this change stays small

## Implementation Decisions

- The Event gains an optional Rush-Listed marker. An Event without it behaves as today.
- The Rush Discount is a flat 10% off the sum of the Order's lines. The amount is rounded down to whole cents.
- The pricing function keeps its existing single-argument call shape. It gains an optional second argument that carries the record of Rush Uses, keyed by Account and Event (see ADR 0001).
- When a record is supplied, granting the Rush Discount adds a Rush Use to it, and an Account and Event pair already in it gets no discount. When no record is supplied, nothing is remembered and the discount always applies to a Rush-Listed Event.
- A refused discount is not an error: the Order is priced at full price.
- The priced result shows the discount as its own line, with a description and a negative amount. The order total is the sum of the Order's lines plus the discount line. An Order with no discount has no such line, so existing results are unchanged.
- No other module is introduced. All behaviour lives behind the pricing function.

## Testing Decisions

- A good test calls the pricing function with an Order and asserts on the returned lines and total only. It never reaches into the record of Rush Uses or any helper.
- The one seam is the pricing function. No new seams are proposed.
- Prior art: the existing pricing tests, which build an Order and assert on the priced result.
- Each ticket's tests are written first, one at a time.

## Out of Scope

- The funding split between organiser and Rush.
- Rush Pass, Rush-Channel Orders and logged-in checks.
- Rush Bundles and percentage caps, other discount kinds, and combining discounts.
- Persisting Rush Uses anywhere; the record lives only for as long as the caller keeps it.

## Further Notes

This is a demo-sized reading of the real Rush Discount rules. Vocabulary follows `GLOSSARY.md`.
