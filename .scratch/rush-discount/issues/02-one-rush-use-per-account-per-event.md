# 02: Record the Rush Use and refuse a second one for the same Account and Event

**What to build:** When the caller supplies a record of Rush Uses, granting the Rush Discount records a Rush Use for that Account and Event, and a later Order from the same Account for the same Event is priced at full price. A different Account, or a different Rush-Listed Event, still gets the discount. Without a record, the discount always applies, as in ticket 01.

**Blocked by:** 01

**Status:** ready-for-agent

- [ ] With a record supplied, the first Order for an Account and Rush-Listed Event gets the discount
- [ ] A second Order for the same Account and Event, with the same record, is priced at full price and is not rejected
- [ ] A different Account on the same Event, and the same Account on a different Rush-Listed Event, each still get the discount
- [ ] Without a record, the discount applies every time
- [ ] Tests go through the pricing function only, and calling it with just an Order still works
