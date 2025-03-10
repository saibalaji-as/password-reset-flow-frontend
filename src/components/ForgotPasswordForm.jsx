import { useState } from 'react';
import axios from 'axios';

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to request a password reset link
      const host = document.location.hostname === 'localhost' ? document.location.origin : 'https://password-reset-flow-backend-ps31.onrender.com';
      const url = `${host}/api/auth/forgot-password`
      const response = await axios.post(url, { email });
      setMessage(response.data.message);  // Show success message
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  return (
    <div className="card p-4">
      <h3 >Forgot Password</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Enter your email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {message && <div className="alert alert-info mt-3">{message}</div>}
        <button type="submit" className="btn btn-primary w-100">Request Reset Link</button>
      </form>
    </div>
  );
}

export default ForgotPasswordForm;
