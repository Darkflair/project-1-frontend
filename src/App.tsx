import React from 'react';
import './App.css';
import LoginManagement from './Components/LoginComponents/LoginManagement';
import NavBar from './Components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider, UserContext } from "./Components/Context/UserContext";
import Dashboard from './Components/Dashboard/Dashboard';
import CreateTicket from './Components/Dashboard/CreateTicket';
import PreviousTickets from './Components/Dashboard/PreviousTickets';

function App() {
  const userContextValue = {
    user: { username: "exampleUser", isAuthenticated: true },
    login: (username: string, password: string) => {
      console.log("Logged in as", username);
    },
    logout: () => {
      console.log("Logged out");
    },
  };
  return (
    <div className="App">
      <AuthProvider>

        <NavBar />
        <Routes>
          <Route path="/" element={<LoginManagement />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/createTicket' element={<CreateTicket />}></Route>
          <Route path='/previous-tickets' element={<PreviousTickets />}></Route>
        </Routes>
      </AuthProvider>


    </div>
  );
}

export default App;
