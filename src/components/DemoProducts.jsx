import { useState } from "react";

const DemoProducts = () => {
    
  const demoProducts = [
    {
      id: 'demo-1',
      name: 'Rohu Fish',
      description: 'Fresh water fish, high in protein and omega-3',
      price: 350,
      image: '/public/rui.webp',
      stock: 'Available'
    },
    {
      id: 'demo-2',
      name: 'Hilsa Fish',
      description: 'Premium quality Hilsa, rich and delicious',
      price: 1200,
      image: '/public/ilish.jpg',
      stock: 'Sold'
    },
    {
      id: 'demo-3',
      name: 'Katla Fish',
      description: 'Large carp fish, perfect for curries',
      price: 320,
      image: '/public/katla.jpeg',
      stock: 'Available'
    },
    {
      id: 'demo-4',
      name: 'Pangasius Fish',
      description: 'Boneless white fish, great for frying',
      price: 280,
      image: '/public/pangash.jpeg',
      stock: 'Available'
    },
    {
      id: 'demo-5',
      name: 'Tilapia Fish',
      description: 'Mild flavored fish, easy to cook',
      price: 250,
      image: '/public/telapiya.jpeg',
      stock: 'Sold'
    },
    {
      id: 'demo-6',
      name: 'Shrimp (Chingri)',
      description: 'Fresh prawns, perfect for special dishes',
      price: 850,
      image: '/public/chingri.jpeg',
      stock: 'Available'
    }
  ];

  return (
    <div>
      <div style={{
        backgroundColor: '#fff3cd',
        border: '1px solid #ffc107',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <p style={{ color: '#856404', margin: 0 }}>
          <strong>📢  </strong> - The page is under construction.Thanks for visiting! We’re updating this page to serve you better.
        </p>
      </div>

      <div className="products-grid">
        {demoProducts.map((product) => (
          <div key={product.id} className="product-card" style={{ position: 'relative' }}>
            {/* Demo Badge */}
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: '#ffc107',
              color: '#000',
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              zIndex: 1
            }}>
              {product.stock}
            </div>

            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">৳{product.price}/kg</p>
            <p style={{ color: '#42787cff', cursor: 'pointer' }}>
              Click here to know details
            </p>
            
            <button
              className=" btn btn-secondary btn-block"
              disabled
              style={{ cursor: 'pointer' }}
            >
              {product.stock === "Available" ? "Add to cart" : "Pre order for next week"}
            </button>
            
            <p style={{ 
              marginTop: '0.5rem', 
              fontSize: '0.85rem', 
              color: '#7f8c8d',
              textAlign: 'center' 
            }}>
              Login and Buy subscription to get fish regularly.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemoProducts;