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
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Fetching live world-wide openings...</p>
    </div>
  );

  return (
    <div className="page-wrapper">
      {/* Header & Search Hero Section */}
      <section className="hero-section">
        <h1>Explore Global Opportunities</h1>
        <p>Find your dream role from top verified tech companies worldwide</p>
        
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by job title, company, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      {/* Main Jobs Grid Container */}
      <div className="parent">
        {filteredJobs.length === 0 ? (
          <div className="no-data">
            <h3>No matching openings found</h3>
            <p>Try searching for a different keyword or location.</p>
          </div>
        ) : (
          filteredJobs.map((elem, index) => (
            <Card 
              key={elem.id || index} 
              company={elem.company_name || "Global Tech"}
              post={elem.title} 
              tag1={elem.type || "Remote"} 
              tag2="Senior Level" 
              pay={elem.salary || "$45/hr"} 
              location={elem.location}
              onApply={() => setSelectedJob(elem)} 
            />
          ))
        )}

        {/* Modal Window */}
        {selectedJob && (
          <ApplicationModal 
            job={selectedJob} 
            onClose={() => setSelectedJob(null)} 
          />
        )}
      </div>
    </div>
  );
};

export default JobPage;