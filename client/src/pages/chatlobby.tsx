import React from 'react';
import NavBar from './NavBar';
import bglobby from '../assets/bglobby.png';

const ChatLobby = () => {
  const items = [
    { name: 'DSA' },
    { name: 'OOP' },
    { name: 'Digital Logic' },
    { name: 'Drawing' },
    { name: 'Electronics' },
    { name: 'Statistics ' },
    { name: 'Discrete ' },
    { name: 'Calculus' },
    { name: 'Environment' },
    { name: 'Mechanics' },
    { name: 'Elementary' },
    { name: 'Physics' },
    { name: 'Chemistry' },
    { name: 'Mathematics' },
    { name: 'Probability' },
  ];

  const handleBoxClick = async (subjectName: string) => {
    try {
      const response = await fetch('https://your-backend-endpoint.com/api/subjects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject: subjectName }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response from backend:', data);
      } else {
        console.error('Failed to send subject name to backend');
      }
    } catch (error) {
      console.error('Error sending subject name to backend:', error);
    }
  };

  return (
    <div className='flex flex-col h-screen'>
      <NavBar />
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-10 mt-6'>
        {items.map((item, index) => (
          <div
            key={index}
            className={`relative flex items-center justify-center bg-emerald-200 bg-cover bg-center bg-no-repeat h-40 w-40 m-2 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-110 cursor-pointer`}
            style={{ backgroundImage: `url(${bglobby})` }}
            onClick={() => handleBoxClick(item.name)}
          >
            <span className='text-lg font-semibold text-white'>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatLobby;
