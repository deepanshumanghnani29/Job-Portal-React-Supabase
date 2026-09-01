import { useState, useEffect } from 'react';
import Card from '../components/Card';
import ApplicationModal from '../components/ApplicationModal';

const JobPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const N8N_GET_JOBS_URL = 'https://n8nash.yantramedha.com/webhook/01547fff-aec2-4a5f-ab4d-39d41547ff76';

    fetch(N8N_GET_JOBS_URL)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setJobs(data);
        } else {
          console.error("Backend did not return an array:", data);
          setJobs([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching live jobs:", err);
        setLoading(false);
        setJobs([]);
      });
  }, []);

  // Filter jobs based on search input
  const filteredJobs = jobs.filter((job) => {
    const titleMatch = job.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const companyMatch = job.company_name?.toLowerCase().includes(searchQuery.toLowerCase());
    const locationMatch = job.location?.toLowerCase().includes(searchQuery.toLowerCase());
    return titleMatch || companyMatch || locationMatch;
  });

  if (loading) return (
    <div className="loading-container" style={{ textAlign: 'center', paddingTop: '100px', fontFamily: 'sans-serif', color: '#666' }}>
      <div className="spinner"></div>
      <p>Fetching live world-wide openings...</p>
    </div>
  );

  return (
    /* 1. Page Wrapper: Added top padding so header isn't hidden under Navbar */
    <div className="page-wrapper" style={{ width: '100%', minHeight: '100vh', backgroundColor: '#f4f6f8', paddingTop: '40px', paddingBottom: '60px', boxSizing: 'border-box' }}>
      
      {/* Header & Search Hero Section */}
      <section className="hero-section" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1a1d20', marginBottom: '8px' }}>Explore Global Opportunities</h1>
        <p style={{ color: '#6c757d', fontSize: '16px', marginBottom: '28px' }}>Find your dream role from top verified tech companies worldwide</p>
        
        <div className="search-bar" style={{ maxWidth: '600px', margin: '0 auto 40px auto', position: 'relative' }}>
          <span className="search-icon" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px' }}>🔍</span>
          <input
            type="text"
            placeholder="Search by job title, company, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 20px 14px 45px',
              fontSize: '15px',
              borderRadius: '30px',
              border: '1px solid #ced4da',
              outline: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </section>

      {/* 2. Main Jobs Grid: Centered max-width and responsive CSS Grid fix */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div className="parent" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px', justifyContent: 'center' }}>
          {filteredJobs.length === 0 ? (
            <div className="no-data" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#6c757d' }}>
              <h3>No matching openings found</h3>
              <p>Try searching for a different keyword or location.</p>
            </div>
          ) : (
            filteredJobs.map((elem, index) => (
              <Card 
                url={elem.url}
                key={elem.id || index} 
                company={elem.Company_name || "Global Tech"}
                post={elem.title} 
                tag1={elem.type || "Remote"} 
                tag2={elem.jobtype || "Senior Level" }
                pay={elem.salary || "$45/hr"} 
                location={elem.location}
                onApply={() => setSelectedJob(elem)} 
              />
            ))
          )}
        </div>
      </div>

      {/* Modal Window */}
      {selectedJob && (
        <ApplicationModal 
          job={selectedJob} 
          onClose={() => setSelectedJob(null)} 
        />
      )}
    </div>
  );
};

export default JobPage;