# Rush Discount is limited once per Account per Event, not once per Order

A Rush Discount is granted at most once for each Account and Event pair, tracked as a Rush Use, rather than being allowed on every Order. Otherwise an Account could split its tickets across many Orders and collect the discount repeatedly. The cost is that pricing now depends on past Orders, so callers supply the record of Rush Uses; without one, nothing is remembered and the discount always applies. Funding of the discount between organiser and Rush is a separate decision and is not covered here.
