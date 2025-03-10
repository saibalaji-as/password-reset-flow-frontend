import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSignup = async (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      try {
        const host = document.location.hostname === 'localhost' ? document.location.origin : 'https://password-reset-flow-backend-ps31.onrender.com';
        const url = `${host}/api/auth/register`
        const response = await axios.post(url, { email, password });
        alert(response.data.message);
        navigate('/login');
      } catch (error) {
        alert(error.response?.data?.message || "Signup failed");
      }
    };
  
    return (
      <div className="container mt-5">
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Re-enter Password</label>
            <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
        <p className="mt-3">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    );
  }

export default SignupForm;