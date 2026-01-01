from fastapi import HTTPException

from mock_data import PRODUCTS


def validate_checkout_request(product_ids: list[str]) -> list[dict]:
    """Validate checkout request and return line items for Stripe."""
    if not product_ids:
        raise HTTPException(status_code=400, detail="No products selected")

    line_items = []
    for product_id in product_ids:
        product = PRODUCTS.get(product_id)
        if product:
            line_items.append({
                "price_data": {
                    "currency": "usd",
                    "product_data": {"name": product["name"]},
                    "unit_amount": product["price"],
                },
                "quantity": 1,
            })

    if not line_items:
        raise HTTPException(status_code=400, detail="No valid products found")

    return line_items

