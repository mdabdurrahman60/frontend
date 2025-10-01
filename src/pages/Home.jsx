import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import DemoProducts from '../components/DemoProducts';
import Footer from '../components/Footer';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  }, []);

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

  const addToCart = (product, quantity) => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }

    if (user.role !== 'customer') {
      alert('Only customers can add items to cart');
      return;
    }

    const existingItem = cart.find(item => item.product._id === product._id);
    
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map(item =>
        item.product._id === product._id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [...cart, { product, quantity }];
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
    alert(`${product.name} added to cart!`);
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="container">
      <h1 style={{ marginTop: '2rem', color: '#2c3e50' }}>Fresh Fish Available</h1>
      
      {products.length === 0 ? (
        <p></p> // No products available at the moment.
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      )}

      {user && user.role === 'customer' && (
        <Cart cart={cart} setCart={setCart} user={user} />
      )}
      <DemoProducts/>
      <Footer/>
    </div>
  );
};

export default Home;