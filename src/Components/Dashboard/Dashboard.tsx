import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/UserContext';
import { getTicketsByStatus, getTicketsByIdAndStatus, Ticket } from './TicketHandler';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css'; 

const Dashboard = () => {
  const { user } = useAuth(); 
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // If user is not logged in or the role is not "manager", show their tickets
    if (!user.isAuthenticated) {
      navigate('/'); // Redirect to login if not authenticated
      return;
    }

    // Fetch tickets for the logged-in user
    const fetchTickets = async () => {
      try {
        if (user.role === 'manager') {
          // Managers see all pending tickets
          const fetchedTickets = await getTicketsByStatus();
          const pendingTickets = fetchedTickets.filter((ticket) => ticket.status === 'Pending');
          setTickets(pendingTickets);
        } else {
          // Employees see only their own tickets
          const fetchedTickets = await getTicketsByIdAndStatus(user.id);
          setTickets(fetchedTickets);
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, [user, navigate]);

  
  const handleApproveTicket = async (ticketId: number) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/tickets/${ticketId}/approve`);
      console.log("Ticket approved:", response.data);

      // Remove the approved ticket from the list
      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket.id !== ticketId)
      );
    } catch (error) {
      console.error("Error approving ticket:", error);
    }
  };

  const handleDenyTicket = async (ticketId: number) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/tickets/${ticketId}/decline`);
      console.log("Ticket denied:", response.data);

      // Remove the denied ticket from the list
      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket.id !== ticketId)
      );
    } catch (error) {
      console.error("Error denying ticket:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-header">Welcome, {user.username}</h2>

      <h3>Pending Tickets</h3>
      {tickets.length > 0 ? (
        <ul className="dashboard-tickets">
          {tickets.map((ticket) => (
            <li key={ticket.id} className="dashboard-ticket">
              <p className='ticket-id'>Ticket ID: {ticket.id}</p>
              <p className="ticket-description">{ticket.description}</p>
              <p className="ticket-amount">Amount: ${ticket.amount}</p>
              <p className="ticket-status">Status: {ticket.status}</p>
              {user.role === 'manager' && ticket.status === 'Pending' && (
                <>
                  <button onClick={() => handleApproveTicket(ticket.id)}>Approve</button>
                  <button className="deny" onClick={() => handleDenyTicket(ticket.id)}>Deny</button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-tickets">No tickets available.</p>
      )}
    </div>
  );
};

export default Dashboard;
