import { useState } from 'react';
import { supabase } from '../supabaseClient'; 

const CompanyForm = () => {
  // 1. Local state to capture form inputs
  const [formData, setFormData] = useState({
    company_name: '',
    email: '',
    website: '',
    location: ''
  });

  // 2. Track submission statuses
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  // Update state whenever an input field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      // 3. Send data DIRECTLY to your Supabase 'companies' table
      const { error } = await supabase
        .from('companies') 
        .insert([
          {
            company_name: formData.company_name,
            email: formData.email,
            website: formData.website,
            location: formData.location 
          }
        ]);

      // If Supabase returns an error, throw it so the catch block catches it
      if (error) {
        throw error;
      }

      // 4. If Supabase responds with success
      setStatus({ loading: false, success: true, error: null });
      
      // Clear out form inputs for the next submission
      setFormData({ company_name: '', email: '', location: '', website: '' });

    } catch (err) {
      // Show the actual Supabase error message on the screen
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  return (
    <div className="form-container" style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>Insert New Company / Job</h2>
      
      {/* Success Notification Status Banner */}
      {status.success && (
        <div style={{ color: '#155724', backgroundColor: '#d4edda', border: '1px solid #c3e6cb', padding: '12px', borderRadius: '6px', marginBottom: '20px', fontWeight: '600' }}>
          Data successfully saved!
        </div>
      )}

      {/* Error Notification Status Banner */}
      {status.error && (
        <div style={{ color: '#721c24', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', padding: '12px', borderRadius: '6px', marginBottom: '20px' }}>
          ❌ Submission Error: {status.error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Company Name</label>
          <input 
            type="text" 
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            placeholder="e.g. Google" 
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Company Email</label>
          <input 
            type="text" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. google@gmail.com" 
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Website</label>
          <input 
            type="text" 
            name="Website"
            value={formData.website}
            onChange={handleChange}
            placeholder="e.g. www.company.com" 
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Location</label>
          <input 
            type="text" 
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Bengaluru, India" 
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <button 
          type="submit" 
          className="submit-btn" 
          disabled={status.loading}
          style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: status.loading ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '16px' }}
        >
          {status.loading ? 'Submitting Data...' : 'Submit Data'}
        </button>
      </form>
    </div>
  );
};

export default CompanyForm;