import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const OrderSuccess = () => {
  const { orderId } = useParams();
  const { user } = useContext(AuthContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        };
        const { data } = await axios.get(`/api/orders/${orderId}`, config);
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrder();
    }
  }, [orderId, user]);

  if (loading) {
    return <div className="loading">Loading order details...</div>;
  }

  if (!order) {
    return (
      <div className="container">
        <div className="alert alert-error" style={{ marginTop: '2rem' }}>
          Order not found
        </div>
        <Link to="/" className="btn btn-primary">Go to Home</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="cart-container" style={{ marginTop: '2rem' }}>
        <div className="alert alert-success">
          <h2>✅ Order Placed Successfully!</h2>
          <p>Thank you for your order. We'll deliver it soon!</p>
        </div>

        <h3>Order Details</h3>
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        <p><strong>Status:</strong> <span className={`status-badge status-${order.status}`}>{order.status}</span></p>

        <h3 style={{ marginTop: '2rem' }}>Items Ordered</h3>
        {order.items.map((item, idx) => (
          <div key={idx} className="cart-item">
            <div>
              <p><strong>{item.name}</strong></p>
              <p>Quantity: {item.quantity} kg</p>
              <p>Price: ৳{item.price}/kg</p>
            </div>
            <div>
              <p><strong>৳{(item.quantity * item.price).toFixed(2)}</strong></p>
            </div>
          </div>
        ))}

        <div className="cart-total">
          Total Amount: ৳{order.totalAmount.toFixed(2)}
        </div>

        <h3 style={{ marginTop: '2rem' }}>Delivery Information</h3>
        <p><strong>Phone:</strong> {order.phone}</p>
        <p><strong>Address:</strong> {order.address}</p>
        <p><strong>Payment Method:</strong> {order.paymentMethod}</p>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Link to="/" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;