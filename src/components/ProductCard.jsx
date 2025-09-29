import { useState } from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p className="price">৳{product.price}/kg</p>
      <p style={{ color: product.stock > 0 ? '#27ae60' : '#e74c3c' }}>
        {product.stock > 0 ? `Stock: ${product.stock} kg` : 'Out of Stock'}
      </p>
      <div className="quantity-controls">
        <button onClick={() => setQuantity(Math.max(1, quantity - 0.5))}>-</button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(0.5, parseFloat(e.target.value) || 0.5))}
          step="0.5"
          min="0.5"
        />
        <button onClick={() => setQuantity(quantity + 0.5)}>+</button>
        <span>kg</span>
      </div>
      <button
        className="btn btn-primary btn-block"
        onClick={handleAddToCart}
        disabled={product.stock === 0}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;