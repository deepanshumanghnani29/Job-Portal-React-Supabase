import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';

const CompanyJobsPage = () => {
  // useParams ka use karke URL se companyId variable nikalenge
  const { companyId } = useParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const N8N_FILTERED_JOBS_URL = 'https://n8nash.yantramedha.com/webhook-test/2838d5b5-af42-46c9-9be6-a381d03895d7';

    fetch(N8N_FILTERED_JOBS_URL)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching filtered jobs:", err);
        setLoading(false);
      });
  }, [companyId]);

  if (loading) return <div className="loading-text">Loading jobs for this company...</div>;

  return (
    <div className="companies-container">
      <h2 className="page-title">Available Openings</h2>
      
      {jobs.length === 0 ? (
        <p className="no-data">This company has not posted any jobs yet.</p>
      ) : (
        <div className="parent">
          {jobs.map((elem, index) => (
            <Card key={elem.id || index} {...elem} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyJobsPage;