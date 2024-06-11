// NameContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a context
const NameContext = createContext();

// Create a context provider
export const NameProvider = ({ children }) => {
    const [name, setName] = useState('');

    //   // Function to fetch name from the API
    //   const fetchName = async () => {
    //     try {
    //       const response = await axios.get('https://api.example.com/name'); // Replace with your API endpoint
    //       setName(response.data.name); // Adjust based on your API response structure
    //     } catch (error) {
    //       console.error('Error fetching name:', error);
    //     }
    //   };

    setName("sanjay")

    // useEffect(() => {
    //     fetchName();
    // }, []);

    return (
        <NameContext.Provider value={{ name, setName }}>
            {children}
        </NameContext.Provider>
    );
};

export default NameContext;
