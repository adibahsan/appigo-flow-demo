# 03: Show the Rush Discount as its own line in the result

**What to build:** The priced result for an Order that got the Rush Discount shows it as its own line, with a description and a negative amount, so the Account can see what it saved. The total is the sum of the Order's lines plus the discount line. An Order with no discount has no such line.

**Blocked by:** 01, 02

**Status:** ready-for-agent

- [ ] A discounted result carries a Rush Discount line with a negative amount equal to the saving
- [ ] The total equals the sum of the item lines plus the discount line
- [ ] A result with no discount (not Rush-Listed, or a refused second use) has no discount line, and existing results are unchanged
- [ ] Tests go through the pricing function only
