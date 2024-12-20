import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateTicket.css';
import { useAuth } from '../Context/UserContext';

const CreateTicket = () => {
  const {user} = useAuth();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number | string>('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description || !amount) {
      setError('Please provide both description and amount.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/tickets/createTicket', {
        description,
        amount,
        postedBy: user.id
      });

      setSuccessMessage('Ticket created successfully!');
      setError('');
      setDescription('');
      setAmount('');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (error) {
      setError('Error creating ticket, please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="create-ticket-container">
      <h2 className="create-ticket-header">Create a New Ticket</h2>
      
      <form className="create-ticket-form" onSubmit={handleSubmit}>
        {error && <div className="create-ticket-error">{error}</div>}
        {successMessage && <div className="create-ticket-success">{successMessage}</div>}
        
        <label htmlFor="description">Ticket Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="Enter a description for your ticket"
        ></textarea>
        
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter the ticket amount"
        />

        <button type="submit">Submit Ticket</button>
      </form>
    </div>
  );
};

export default CreateTicket;
