import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminProductForm = ({ user, editProduct, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    stock: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editProduct) {
      setFormData({
        name: editProduct.name,
        description: editProduct.description,
        price: editProduct.price,
        image: editProduct.image,
        stock: editProduct.stock
      });
    }
  }, [editProduct]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      };

      if (editProduct) {
        await axios.put(`/api/products/${editProduct._id}`, formData, config);
      } else {
        await axios.post('/api/products', formData, config);
      }

      setFormData({
        name: '',
        description: '',
        price: '',
        image: '',
        stock: ''
      });

      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>{editProduct ? 'Edit Product' : 'Add New Product'}</h2>
      
      {error && <div className="alert alert-error">{error}</div>}

      <div className="form-group">
        <label>Fish Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="e.g., Rohu Fish"
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="3"
          placeholder="Enter product description"
        />
      </div>

      <div className="form-group">
        <label>Price per KG (৳)</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          step="0.01"
          min="0"
          placeholder="e.g., 350"
        />
      </div>

      <div className="form-group">
        <label>Image URL</label>
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="form-group">
        <label>Stock (KG)</label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          required
          step="0.5"
          min="0"
          placeholder="e.g., 50"
        />
      </div>

      <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
        {loading ? 'Saving...' : (editProduct ? 'Update Product' : 'Add Product')}
      </button>
    </form>
  );
};

export default AdminProductForm;