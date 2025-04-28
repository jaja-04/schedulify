import axios from 'axios';
import React, { useState } from 'react'; 
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(null);
  const {login} = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
  
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userRole", response.data.user.role); 
  
        if (response.data.user.role === "admin") {
          navigate('/admin-dashboard');
        } else if(response.data.user.role === 'faculty') {
          navigate('/faculty-dashboard');
        } else {
            navigate('/student-dashboard')
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Server Error");
      }
    }
  };
  

  return (
    <div className="login-container">
      <h2>Scholarship Management Login</h2>
      <hr />
  
      {error && <p className="error-message">{error}</p>}
  
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="input-field"
            placeholder={isEmailFocused ? "" : "Enter Email"}
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(false)}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
  
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="input-field"
            placeholder={isPasswordFocused ? "" : "Enter Password"}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
  
        <div className="remember-me">
          <label>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <span>Remember me</span>
          </label>
          <a href="#">Forgot password?</a>
        </div>
  
        <button type="submit">Login</button>
      </form>
    </div>
  );
  
  
}

export default Login;