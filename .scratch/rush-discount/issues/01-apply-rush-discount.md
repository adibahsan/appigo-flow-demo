# 01: Apply the Rush Discount on a Rush-Listed Event

**What to build:** An Order for a Rush-Listed Event is priced with the Rush Discount applied automatically: 10% off the sum of its lines, rounded down to whole cents. An Order for an Event that is not Rush-Listed is priced exactly as before. The existing way of calling the pricing function does not change.

**Blocked by:** None (can start immediately)

**Status:** resolved

- [x] An Order for a Rush-Listed Event has its total reduced by 10%, rounded down to whole cents
- [x] An Order for an Event that is not Rush-Listed is priced exactly as before
- [x] An empty Order for a Rush-Listed Event still totals zero
- [x] Tests go through the pricing function only, and the existing tests still pass

## Comments

Implemented through `priceOrder` only: a Rush-Listed Event takes 10% off the sum of the lines, rounded down to whole cents. `npm test` and `npm run typecheck` green.
