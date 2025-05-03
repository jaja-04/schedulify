// authContext.jsx - Fixed version that SHOULD NOT contain useNavigate
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
// Create the context
const UserContext = createContext();
// Create the provider component (rename from AuthContext to AuthProvider)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start with loading true
 
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:5000/api/auth/verify', {
            headers: {
              "Authorization": `Bearer ${token}`
            },
          });
         
          console.log(response);
          if (response.data.success) {
            setUser(response.data.user);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log(error);
        if (error.response && !error.response.data.success) {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);
  const login = (userData) => {
    setUser(userData);
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    // Don't use navigate here - we'll handle this in the component that calls logout
  };
  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};
// Custom hook to use the auth context
export const useAuth = () => useContext(UserContext);
// Export the context (optional, usually not needed)
export default UserContext;