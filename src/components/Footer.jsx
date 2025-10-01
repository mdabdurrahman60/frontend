const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#2c3e50',
      color: 'white',
      marginTop: '4rem',
      padding: '3rem 2rem 1rem',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* About Section */}
          <div>
            <h3 style={{ marginBottom: '1rem' }}>🐟 Fish Shop</h3>
            <p style={{ color: '#bdc3c7', lineHeight: '1.6' }}>
              Your trusted source for fresh, quality fish. We deliver the freshest catch directly to your door with our cash on delivery service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ marginBottom: '1rem' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="/" style={{ color: '#bdc3c7', textDecoration: 'none' }}>Home</a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="/login" style={{ color: '#bdc3c7', textDecoration: 'none' }}>Login</a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="/register" style={{ color: '#bdc3c7', textDecoration: 'none' }}>Register</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 style={{ marginBottom: '1rem' }}>Contact Us</h3>
            <p style={{ color: '#bdc3c7', marginBottom: '0.5rem' }}>
              📞 Phone: +880 191980****
            </p>
            <p style={{ color: '#bdc3c7', marginBottom: '0.5rem' }}>
              📧 Email: info@fishshop.com
            </p>
            <p style={{ color: '#bdc3c7', marginBottom: '0.5rem' }}>
              📍 Address: Dhaka, Bangladesh
            </p>
          </div>

          {/* Business Hours */}
          <div>
            <h3 style={{ marginBottom: '1rem' }}>Business Hours</h3>
            <p style={{ color: '#bdc3c7', marginBottom: '0.5rem' }}>
              Saturday - Thursday
            </p>
            <p style={{ color: '#bdc3c7', marginBottom: '0.5rem' }}>
              9:00 AM - 8:00 PM
            </p>
            <p style={{ color: '#bdc3c7', marginBottom: '0.5rem' }}>
              Friday: Closed
            </p>
          </div>
        </div>

        {/* Payment & Delivery Info */}
        <div style={{
          borderTop: '1px solid #34495e',
          paddingTop: '1.5rem',
          marginTop: '1.5rem',
          textAlign: 'center'
        }}>
          <p style={{ color: '#bdc3c7', marginBottom: '0.5rem' }}>
            💵 Payment Method: Cash on Delivery (COD)
          </p>
          <p style={{ color: '#bdc3c7', marginBottom: '1rem' }}>
            🚚 Free Delivery on Orders Above ৳1000
          </p>
        </div>

        {/* Copyright */}
        <div style={{
          borderTop: '1px solid #34495e',
          paddingTop: '1.5rem',
          marginTop: '1.5rem',
          textAlign: 'center'
        }}>
          <p style={{ color: '#bdc3c7' }}>
            &copy; {new Date().getFullYear()} Fish Shop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;