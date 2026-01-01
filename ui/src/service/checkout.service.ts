import { postRequest } from "./index";

interface CheckoutResponse {
  checkout_url: string;
}

export async function checkoutProducts(productIds: string[]): Promise<string> {
  const response = await postRequest<CheckoutResponse>("/api/checkout", {
    product_ids: productIds,
  });

  return response.checkout_url;
}

