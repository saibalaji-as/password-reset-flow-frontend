import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import ResetPasswordForm from './components/ResetPasswordForm';

function App() {

  return (
    <Router>
      <div className="container mx-auto">
        <h1 className="title text-center mb-5">Password Reset Flow</h1>
        <Routes>
          <Route path="/" element={<ForgotPasswordForm />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordForm />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
