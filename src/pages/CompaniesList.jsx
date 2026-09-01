import { useState, useEffect } from 'react';

const CompaniesList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const N8N_GET_URL = 'https://n8nash.yantramedha.com/webhook/list-companies'; 

        const response = await fetch(N8N_GET_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        setCompanies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);


// When all complies will load , so this is the code of loading:
if (loading) return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif', color: '#666' }}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div
        style={{
          display: 'inline-block',
          width: '30px',
          height: '30px',
          border: '3px solid #f3f3f3',
          borderTop: '3px solid #666',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
    </div>
  );

  if (error) return <div style={{ textAlign: 'center', color: '#dc3545', marginTop: '50px', fontFamily: 'sans-serif' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto', fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif', backgroundColor: '#f8f9fa', borderRadius: '12px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#212529', fontWeight: '700', letterSpacing: '-0.5px' }}>Registered Companies</h2>
      
      {companies.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#6c757d', fontSize: '16px' }}>No companies found.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {companies.map((company, index) => (
            <div 
              key={index} 
              style={{ 
                border: '1px solid #e0e0e0', 
                padding: '24px', 
                borderRadius: '12px', 
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* 1. Company Name */}
                <h3 style={{ margin: '0 0 12px 0', color: '#0d6efd', fontSize: '20px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>🏢</span> {company.company_name || company.companyName || 'N/A'}
                </h3>
                
                <hr style={{ border: '0', height: '1px', backgroundColor: '#f1f3f5', margin: '0 0 16px 0' }} />

                {/* 2. Company E-mail */}
                <p style={{ margin: '0 0 8px 0', color: '#495057', fontSize: '15px' }}>
                  <strong style={{ color: '#212529' }}>Company Email:</strong> {company.email || 'N/A'}
                </p>
                
                {/* 3. Location */}
                {/* <p style={{ margin: '0 0 8px 0', color: '#495057', fontSize: '15px' }}>
                  <strong style={{ color: '#212529' }}>Location:</strong> <span style={{ color: '#198754', fontWeight: '600' }}>{company.location || 'N/A'}</span>
                </p> */}
              </div>
              
              {/* 5. website */}
                <p style={{ margin: '0 0 8px 0', color: '#495057', fontSize: '15px' }}>
                  <strong style={{ color: '#212529' }}>Website:</strong> <span style={{ color: '#198754', fontWeight: '600' }}>{company.website || 'N/A'}</span>
                </p>

              {/* 4. Location Badge */}
              <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6c757d', backgroundColor: '#f1f3f5', padding: '6px 12px', borderRadius: '20px', width: 'fit-content' }}>
                <span>📍</span> {company.location || 'N/A'}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompaniesList;