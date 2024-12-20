import axios from "axios";

// Define the Ticket interface
export interface Ticket {
  id: number;
  description: string;
  status: string; // Status can be 'Pending', 'Approved', 'Denied'
  amount: number
  postedBy: number
}

// Base URL for the API
const baseUrl = "http://localhost:8080/api/tickets";

// Function to get tickets by userId
export const getTicketsByUserId = async (userId: number): Promise<Ticket[]> => {
    try {
      const response = await axios.get(`${baseUrl}/user/${userId}`);
      console.log("API response:", response.data); // Log the API response
  
      // Filter out tickets with the status 'Pending'
      const filteredTickets = response.data.filter((ticket: Ticket) => ticket.status !== 'Pending');
      
      return filteredTickets;
    } catch (error) {
      console.error("Error fetching tickets:", error);
      throw error;
    }
  };

  // Function to get tickets by userId and status
export const getTicketsByIdAndStatus = async (userId: number): Promise<Ticket[]> => {
  try {
    const response = await axios.get(`${baseUrl}/user/${userId}/Pending`);
    console.log("API response:", response.data);
    return response.data; 
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
};


export const getTicketsByStatus = async (): Promise<Ticket[]> => {
    try {
      const response = await axios.get(`${baseUrl}/status/Pending`);
      console.log("API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching tickets:", error);
      throw error;
    }
  };

// Function to create a new ticket
export const createTicket = async (postedBy: number, description: string, amount: number) => {
    try {
      const response = await axios.post('http://localhost:8080/api/tickets/createTicket', {
        description,
        amount,
        postedBy,
      });
  
      console.log('Ticket created:', response.data);
      return response.data; 
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw error; 
    }
  };

  
