import Link from 'next/link'

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)', 
        color: 'white' 
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '5rem 2rem',
          textAlign: 'center' 
        }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: 'bold', 
            marginBottom: '1.5rem',
            lineHeight: '1.2'
          }}>
            Welcome to Deals.uz
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            marginBottom: '2rem', 
            color: '#bfdbfe', 
            maxWidth: '600px', 
            margin: '0 auto 2rem auto'
          }}>
            Uzbekistan's premier marketplace for buying and selling everything from electronics to vehicles
          </p>
          
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem', 
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Link
              href="/en/marketplace"
              style={{
                backgroundColor: '#f59e0b',
                color: '#1f2937',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontSize: '1.125rem',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              🛍️ Browse Marketplace
            </Link>
            <Link
              href="/en/post"
              style={{
                backgroundColor: 'transparent',
                border: '2px solid white',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontSize: '1.125rem',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              📝 Post Listing
            </Link>
          </div>

          {/* Features Section */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '2rem', 
            marginTop: '4rem',
            textAlign: 'left' 
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌍</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                Multilingual
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#bfdbfe' }}>
                Available in English, Russian, and Uzbek
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛡️</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                Secure
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#bfdbfe' }}>
                Safe and secure transactions
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                Connect
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#bfdbfe' }}>
                Direct messaging between buyers and sellers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section style={{ padding: '4rem 2rem', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem', color: '#333' }}>
            Explore Categories
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '2rem' 
          }}>
            <Link href="/en/browse?category=electronics" style={{ textDecoration: 'none' }}>
              <div style={{ 
                padding: '2rem', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '10px', 
                textAlign: 'center',
                transition: 'transform 0.3s'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📱</div>
                <h3 style={{ fontSize: '1.1rem', color: '#333', fontWeight: '600' }}>Electronics</h3>
              </div>
            </Link>
            <Link href="/en/browse?category=vehicles" style={{ textDecoration: 'none' }}>
              <div style={{ 
                padding: '2rem', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '10px', 
                textAlign: 'center' 
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚗</div>
                <h3 style={{ fontSize: '1.1rem', color: '#333', fontWeight: '600' }}>Vehicles</h3>
              </div>
            </Link>
            <Link href="/en/browse?category=real-estate" style={{ textDecoration: 'none' }}>
              <div style={{ 
                padding: '2rem', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '10px', 
                textAlign: 'center' 
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏠</div>
                <h3 style={{ fontSize: '1.1rem', color: '#333', fontWeight: '600' }}>Real Estate</h3>
              </div>
            </Link>
            <Link href="/en/browse?category=fashion" style={{ textDecoration: 'none' }}>
              <div style={{ 
                padding: '2rem', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '10px', 
                textAlign: 'center' 
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👔</div>
                <h3 style={{ fontSize: '1.1rem', color: '#333', fontWeight: '600' }}>Fashion</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
