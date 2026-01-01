import os
import stripe
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from validators import validate_checkout_request

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

app = FastAPI()


class CheckoutRequest(BaseModel):
    product_ids: list[str]


@app.post("/api/checkout")
async def create_checkout(request: CheckoutRequest):
    line_items = validate_checkout_request(request.product_ids)

    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=line_items,
            mode="payment",
            success_url="http://localhost:8000/success",
            cancel_url="http://localhost:8000/products",
        )
        return {"checkout_url": session.url}
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))


# Mount the ui directory to serve static files (must be last - catch-all)
app.mount("/", StaticFiles(directory="dist", html=True), name="ui")
