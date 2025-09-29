import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cart, setCart, user }) => {
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.product._id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 0.5) return;
    const updatedCart = cart.map(item =>
      item.product._id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    if (!phone || !address) {
      setError('Please provide phone number and address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const orderData = {
        items: cart.map(item => ({
          product: item.product._id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price
        })),
        phone,
        address,
        totalAmount: getTotalAmount()
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      };

      const { data } = await axios.post('/api/orders', orderData, config);

      // Clear cart
      setCart([]);
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('cartUpdated'));

      // Redirect to success page
      navigate(`/order-success/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h2>Your Cart is Empty</h2>
        <p>Add some fish to your cart to continue shopping!</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      
      {cart.map((item) => (
        <div key={item.product._id} className="cart-item">
          <div>
            <h3>{item.product.name}</h3>
            <p>Price: ৳{item.product.price}/kg</p>
            <div className="quantity-controls">
              <button onClick={() => updateQuantity(item.product._id, item.quantity - 0.5)}>
                -
              </button>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.product._id, parseFloat(e.target.value) || 0.5)}
                step="0.5"
                min="0.5"
              />
              <button onClick={() => updateQuantity(item.product._id, item.quantity + 0.5)}>
                +
              </button>
              <span>kg</span>
            </div>
          </div>
          <div>
            <p><strong>৳{(item.product.price * item.quantity).toFixed(2)}</strong></p>
            <button 
              className="btn btn-danger"
              onClick={() => removeFromCart(item.product._id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="cart-total">
        Total: ৳{getTotalAmount().toFixed(2)}
      </div>

      <form onSubmit={handlePlaceOrder} style={{ marginTop: '2rem' }}>
        <h3>Delivery Information</h3>
        
        {error && <div className="alert alert-error">{error}</div>}
        
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="01XXXXXXXXX"
          />
        </div>

        <div className="form-group">
          <label>Delivery Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            rows="3"
            placeholder="Enter your full delivery address"
          />
        </div>

        <div className="alert alert-info">
          <strong>Payment Method:</strong> Cash on Delivery (COD)
        </div>

        <button 
          type="submit" 
          className="btn btn-success btn-block"
          disabled={loading}
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default Cart;