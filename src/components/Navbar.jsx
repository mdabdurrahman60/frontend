import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.length);
    };

    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="navbar">
      <h1>🐟 Fish Shop</h1>
      <nav>
        <Link to="/">Home</Link>
        {user && user.role === 'admin' && (
          <Link to="/admin">Admin Dashboard</Link>
        )}
        {user ? (
          <>
            <span>Welcome, {user.name}</span>
            {user.role === 'customer' && (
              <span>
                Cart <span className="cart-badge">{cartCount}</span>
              </span>
            )}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;