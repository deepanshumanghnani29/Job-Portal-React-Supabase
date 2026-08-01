import React, { useState } from 'react';

const ApplicationModal = ({ job, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', resume: null });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validate PDF upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData({ ...formData, resume: file });
    } else if (file) {
      alert('Please upload a valid PDF document.');
      e.target.value = null; // Clear invalid selection
      setFormData({ ...formData, resume: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.resume) {
      alert('Please select a PDF file for your resume.');
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeBtn} onClick={onClose}>✕</button>

        {isSubmitted ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <h2 style={{ color: '#2e7d32', marginBottom: '10px' }}>🎉 Form Submitted!</h2>
            <p style={{ color: '#555', lineHeight: '1.5' }}>
              Your application for <strong>{job?.title || job?.post || 'this position'}</strong> at{' '}
              <strong>{job?.company_name || job?.company || 'Global Tech'}</strong> has been submitted successfully.
            </p>
            <p style={{ color: '#777', fontSize: '13px', marginTop: '12px' }}>
              Attached File: <strong>📄 {formData.resume?.name}</strong>
            </p>
            <button style={{ ...styles.submitBtn, marginTop: '20px' }} onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <div>
            <h2 style={{ marginBottom: '5px' }}>Apply for Position</h2>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
              {job?.company_name || job?.company} • {job?.title || job?.post}
            </p>

            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Upload Resume (PDF Format Only)</label>
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  required
                  onChange={handleFileChange}
                  style={styles.fileInput}
                />
              </div>

              <button type="submit" style={styles.submitBtn}>
                Submit Application
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '450px',
    position: 'relative',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
    fontFamily: 'sans-serif',
  },
  closeBtn: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#888',
  },
  formGroup: {
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#333',
  },
  input: {
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px',
    outline: 'none',
  },
  fileInput: {
    padding: '8px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px',
    cursor: 'pointer',
    backgroundColor: '#f9f9f9',
  },
  submitBtn: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#000000',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default ApplicationModal;