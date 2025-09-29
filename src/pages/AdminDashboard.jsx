import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import AdminProductForm from '../components/AdminProductForm';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('products');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    fetchProducts();
    fetchOrders();
  }, [user, navigate]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };
      const { data } = await axios.get('/api/orders', config);
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };
      await axios.delete(`/api/products/${id}`, config);
      fetchProducts();
      alert('Product deleted successfully');
    } catch (error) {
      alert('Failed to delete product');
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      };
      await axios.put(`/api/orders/${orderId}/status`, { status: newStatus }, config);
      fetchOrders();
      alert('Order status updated successfully');
    } catch (error) {
      alert('Failed to update order status');
    }
  };

  const handleProductSuccess = () => {
    fetchProducts();
    setEditProduct(null);
    alert(editProduct ? 'Product updated successfully' : 'Product added successfully');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <h1 style={{ marginTop: '2rem', color: '#2c3e50' }}>Admin Dashboard</h1>

      <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <button
          className={`btn ${activeTab === 'products' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('products')}
          style={{ marginRight: '1rem' }}
        >
          Manage Products
        </button>
        <button
          className={`btn ${activeTab === 'orders' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('orders')}
        >
          View Orders
        </button>
      </div>

      {activeTab === 'products' && (
        <>
          <AdminProductForm
            user={user}
            editProduct={editProduct}
            onSuccess={handleProductSuccess}
          />

          {editProduct && (
            <button
              className="btn btn-secondary"
              onClick={() => setEditProduct(null)}
              style={{ margin: '1rem auto', display: 'block' }}
            >
              Cancel Edit
            </button>
          )}

          <h2 style={{ marginTop: '3rem' }}>All Products</h2>
          
          {products.length === 0 ? (
            <p>No products available.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price (৳/kg)</th>
                  <th>Stock (kg)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>৳{product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => setEditProduct(product)}
                        style={{ marginRight: '0.5rem' }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

      {activeTab === 'orders' && (
        <>
          <h2>All Orders</h2>
          
          {orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id.slice(-8)}</td>
                    <td>{order.user?.name || 'N/A'}</td>
                    <td>
                      {order.items.map((item, idx) => (
                        <div key={idx}>
                          {item.name} ({item.quantity}kg)
                        </div>
                      ))}
                    </td>
                    <td>৳{order.totalAmount}</td>
                    <td>{order.phone}</td>
                    <td>{order.address}</td>
                    <td>
                      <span className={`status-badge status-${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                        className="btn btn-secondary"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;