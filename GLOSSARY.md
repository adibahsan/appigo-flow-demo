# Ticketing

A cut-down event-ticketing core: Accounts buy ticket quantities for an Event, and the pricing function turns an Order into line totals and an order total.

## Language

**Event**:
A happening that tickets are sold for.
_Avoid_: Show, gig

**Ticket**:
A ticket type for an Event, with a unit price.
_Avoid_: Product, SKU

**Account**:
The buyer identity that places Orders and is recognised across them.
_Avoid_: Customer, user, guest

**Order**:
An Account buying ticket quantities for one Event.
_Avoid_: Purchase, basket

## Rush

**Rush-Listed**:
An Event the business team has chosen to sell through the Rush app. Only a Rush-Listed Event can carry a Rush Discount.
_Avoid_: Featured, promoted

**Rush Discount**:
The discount applied automatically, with no code to enter, to an Order for a Rush-Listed Event. An Account gets it at most once per Event.
_Avoid_: Promo code, coupon, voucher

**Rush Use**:
The recorded fact that an Account has already received the Rush Discount for an Event.
_Avoid_: Redemption, claim
