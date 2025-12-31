import "./Product.css";

interface ProductProps {
  id: string;
  name: string;
  price: number;
  image: string;
  selected?: boolean;
  onSelect: (id: string) => void;
}

export default function Product({
  id,
  name,
  price,
  image,
  selected,
  onSelect,
}: ProductProps) {
  return (
    <div
      className={`product ${selected ? "product--selected" : ""}`}
      onClick={() => onSelect(id)}
    >
      {selected && <span className="product__checkmark">✓</span>}
      <img className="product__image" src={image} alt={name} />
      <h3 className="product__name">{name}</h3>
      <p className="product__price">${price.toFixed(2)}</p>
    </div>
  );
}
