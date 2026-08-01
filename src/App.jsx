import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Navbar from './components/Navbar';
import JobPage from './pages/JobPage';
import CompanyForm from './pages/CompanyInserted';
import Auth from './pages/Auth';
import CompaniesList from './pages/CompaniesList';

const App = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes (Login/Logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading application...</div>;

  return (
    <>
      {/* Show Navbar only if logged in */}
      {session && <Navbar />} 
      
      <Routes>
        {/* If not logged in, send them to Auth. If logged in, redirect away from Auth to /jobs */}
        <Route path="/" element={!session ? <Auth /> : <Navigate to="/jobs" />} />
        
        {/* Protected Routes */}
        <Route path="/jobs" element={session ? <JobPage /> : <Navigate to="/" />} />
        <Route path="/company-form" element={session ? <CompanyForm /> : <Navigate to="/" />} />
        
        <Route path="/companies" element={session ? <CompaniesList /> : <Navigate to="/" />} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;