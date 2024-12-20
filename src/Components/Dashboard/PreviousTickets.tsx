import React, { useEffect, useState } from 'react';
import { getTicketsByUserId, Ticket } from './TicketHandler'; 
import { useAuth } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import './PreviousTicket.css'; 

const PreviousTickets = () => {
  const { user } = useAuth(); 
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate('/'); // Redirect to login if not authenticated
      return;
    }

    const fetchTickets = async () => {
      try {
        // Fetch previous tickets for the logged-in user
        const fetchedTickets = await getTicketsByUserId(user.id);
        setTickets(fetchedTickets);
      } catch (error) {
        console.error('Error fetching previous tickets:', error);
      }
    };

    fetchTickets();
  }, [user, navigate]);

  return (
    <div className="previous-tickets-container">
      <h2 className="previous-tickets-header">Your Previous Tickets</h2>

      {tickets.length > 0 ? (
        <ul className="previous-tickets-list">
          {tickets.map((ticket) => (
            <li key={ticket.id} className="previous-ticket">
              <p className="ticket-description">{ticket.description}</p>
              <p className="ticket-amount">Amount: ${ticket.amount}</p>
              <p className="ticket-status">Status: {ticket.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-tickets">You don't have any previous tickets.</p>
      )}
    </div>
  );
};

export default PreviousTickets;
