import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async (e) => {
      e.preventDefault();
      console.log({ email, password });
      const host = document.location.hostname === 'localhost' ? document.location.origin : 'https://password-reset-flow-backend-kjxh.onrender.com';
      const url = `${host}/api/auth/login`;
      
      const response = await axios.post(url, { email, password });
      alert("Login successful!");
    };
  
    return (
      <div className="container mt-5">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <p className="mt-3">Don&apos;t have an account? <Link to="/">Signup</Link></p>
        <p className="mt-2"><Link to="/forgot-password">Forgot Password?</Link></p>
      </div>
    );
  }

  export default LoginForm;