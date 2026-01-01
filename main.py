import os
from pathlib import Path

import stripe
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from validators import validate_checkout_request

load_dotenv()
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
BASE_URL = os.getenv("BASE_URL", "http://localhost:8000")

app = FastAPI()

DIST_DIR = Path("dist")


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
            success_url=f"{BASE_URL}/success",
            cancel_url=f"{BASE_URL}/products",
        )
        return {"checkout_url": session.url}
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))


# Serve static assets
app.mount("/assets", StaticFiles(directory=DIST_DIR / "assets"), name="assets")


# SPA fallback - serve index.html for all non-API routes
@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    file_path = DIST_DIR / full_path
    if file_path.is_file():
        return FileResponse(file_path)
    return FileResponse(DIST_DIR / "index.html")
