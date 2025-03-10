import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ResetPasswordForm() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    // Validate token when component is loaded
    const validateToken = async () => {
      try {
        const host = document.location.hostname === 'localhost' ? document.location.origin : 'https://password-reset-flow-backend-kjxh.onrender.com';
        const url = `${host}/api/auth/reset-password/${token}`
        const response = await axios.get(url);
        response && setIsTokenValid(true);
      } catch (error) {
        setMessage(error ? error : 'Invalid or expired token.');
      }
    };

    validateToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const host = document.location.hostname === 'localhost' ? document.location.origin : 'https://password-reset-flow-backend-kjxh.onrender.com';
      const url = `${host}/api/auth/set-new-password`;
      const response = await axios.post(url, { token: token, newPassword: password });
      setMessage(response.data.message);  // Success message
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  return (
    <div className="card p-4">
      <h3>Reset Password</h3>
      {isTokenValid ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {message && <div className="alert alert-info mt-3">{message}</div>}
          <button type="submit" className="btn btn-primary w-100">Reset Password</button>
        </form>
      ) : (
        <div className="alert alert-danger">Token has expired or is invalid</div>
      )}
    </div>
  );
}

export default ResetPasswordForm;
