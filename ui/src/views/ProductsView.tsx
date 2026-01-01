import { useState } from "react";
import Product from "../components/Product";
import { checkoutProducts } from "../service/checkout.service";
import { fakeProducts } from "../mock/products.types";
import "./ProductsView.css";

export function ProductsView() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectProduct = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const checkoutUrl = await checkoutProducts(selectedProducts);
      window.location.href = checkoutUrl;
    } catch (error) {
      alert(error instanceof Error ? error.message : "Checkout failed");
    } finally {
      setIsLoading(false);
    }
  };

  const totalPrice = selectedProducts.reduce((sum, id) => {
    const product = fakeProducts.find((p) => p.id === id);
    return sum + (product?.price || 0);
  }, 0);

  return (
    <div className="products-view">
      <h1>Products Catalog</h1>

      <ul className="products-list">
        {fakeProducts.map((product) => (
          <li key={product.id}>
            <Product
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              selected={selectedProducts.includes(product.id)}
              onSelect={handleSelectProduct}
            />
          </li>
        ))}
      </ul>

      {selectedProducts.length > 0 && (
        <div className="checkout-bar">
          <span className="checkout-bar__summary">
            {selectedProducts.length} item{selectedProducts.length > 1 ? "s" : ""} · ${totalPrice.toFixed(2)}
          </span>
          <button
            className="checkout-bar__button"
            onClick={handleCheckout}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Proceed to Checkout"}
          </button>
        </div>
      )}
    </div>
  );
}
