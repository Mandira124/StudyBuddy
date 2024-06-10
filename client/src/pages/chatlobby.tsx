import React from 'react';
import NavBar from './NavBar';

const ChatLobby = () => {
  const items = [
    { name: 'DSA', bgColor: 'bg-green-200' },
    { name: 'OOP', bgColor: 'bg-blue-200' },
    { name: 'Digital Logic', bgColor: 'bg-yellow-200' },
    { name: 'Drawing', bgColor: 'bg-red-200' },
    { name: 'Electronics', bgColor: 'bg-purple-200' },
    { name: 'Statistics and Probability', bgColor: 'bg-pink-200' },
    { name: 'Differential Mathematics', bgColor: 'bg-indigo-200' },
    { name: 'Advanced Calculus', bgColor: 'bg-teal-200' },
    { name: 'Environmental Engineering', bgColor: 'bg-orange-200' },
    { name: 'Mechanics', bgColor: 'bg-gray-200' },
    { name: 'Elementary Engineering', bgColor: 'bg-emerald-200' },
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
      <div className='grid grid-cols-5 gap-4 p-10 mt-10 ml-10'>
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-center ${item.bgColor} h-40 w-40 m-2 rounded-lg shadow-lg p-6 mb-10 transition-transform transform hover:scale-110 cursor-pointer`}
            onClick={() => handleBoxClick(item.name)}
          >
            <span className='text-lg font-semibold'>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatLobby;
