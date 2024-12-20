import React, { FormEvent, useContext, useState } from "react";
import axios from "axios";
import { useAuth, UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import LoginComponent from "./LoginComponent";

function UserManagement() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const context = useContext(UserContext);
  const { login } = useAuth();
  const navigate = useNavigate();

  if (!context) {
    throw new Error("UserManagement must be used within an AuthProvider");
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!username || !password) {
      console.error("Username or password is missing.");
      setErrorMessage("Login failed. Please check your credentials.");
      return;
    }

    setLoading(true);
    setErrorMessage("");  
    setSuccessMessage(""); 

    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        username,
        password,
      });

      console.log("Login successful:", response.data);

      const { id, username: user, role } = response.data;
      login(id, user, role); 

      setSuccessMessage("Login successful!");

      
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);

    
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials.");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);

      if (axios.isAxiosError(error)) {
        console.error("Axios error during login:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error during login:", error);
      }
    } finally {
      setLoading(false);
    }
  }

  const handleRegister = async () => {
    if (!username || !password) {
      console.error("Username or password is missing.");
      setErrorMessage("Registration failed. Please try again.");
      return;
    }

    setLoading(true);
    setErrorMessage(""); 
    setSuccessMessage(""); 

    try {
      const response = await axios.post("http://localhost:8080/api/register", {
        username,
        password,
      });

      setSuccessMessage("User registered successfully.");
      setUsername("");
      setPassword("");

    
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/");
      }, 2000);
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
      setTimeout(() => {
        setErrorMessage(""); 
      }, 2000);

      console.error("Error during registration", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <LoginComponent
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        handleRegister={handleRegister}
        loading={loading} 
      />
    </div>
  );
}

export default UserManagement;
