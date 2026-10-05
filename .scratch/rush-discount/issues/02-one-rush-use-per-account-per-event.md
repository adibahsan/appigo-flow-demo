# 02: Record the Rush Use and refuse a second one for the same Account and Event

**What to build:** When the caller supplies a record of Rush Uses, granting the Rush Discount records a Rush Use for that Account and Event, and a later Order from the same Account for the same Event is priced at full price. A different Account, or a different Rush-Listed Event, still gets the discount. Without a record, the discount always applies, as in ticket 01.

**Blocked by:** 01

**Status:** resolved

- [x] With a record supplied, the first Order for an Account and Rush-Listed Event gets the discount
- [x] A second Order for the same Account and Event, with the same record, is priced at full price and is not rejected
- [x] A different Account on the same Event, and the same Account on a different Rush-Listed Event, each still get the discount
- [x] Without a record, the discount applies every time
- [x] Tests go through the pricing function only, and calling it with just an Order still works

## Comments

Implemented through `priceOrder` only: an optional record of Rush Uses is filled when the discount is granted, and a second Order for the same Account and Event is priced at full price. Calling it with just an Order still works. `npm test` and `npm run typecheck` green.
