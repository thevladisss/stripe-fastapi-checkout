import { useState } from "react";
import Product from "../components/Product";
import "./ProductsView.css";

const fakeProducts = [
  {
    id: "1",
    name: "Server Boost",
    price: 4.99,
    image: "https://placehold.co/400x200/6366f1/ffffff?text=🚀+Server+Boost",
  },
  {
    id: "2",
    name: "Nitro Monthly",
    price: 9.99,
    image: "https://placehold.co/400x200/8b5cf6/ffffff?text=⚡+Nitro",
  },
  {
    id: "3",
    name: "Nitro Basic",
    price: 2.99,
    image: "https://placehold.co/400x200/ec4899/ffffff?text=✨+Basic",
  },
  {
    id: "4",
    name: "Premium Plus",
    price: 14.99,
    image: "https://placehold.co/400x200/f59e0b/ffffff?text=👑+Premium",
  },
  {
    id: "5",
    name: "Cloud Storage",
    price: 3.99,
    image: "https://placehold.co/400x200/10b981/ffffff?text=☁️+Cloud",
  },
  {
    id: "6",
    name: "AI Assistant",
    price: 19.99,
    image: "https://placehold.co/400x200/06b6d4/ffffff?text=🤖+AI",
  },
];

export function ProductsView() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const handleSelectProduct = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
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
          <button className="checkout-bar__button">Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
}
