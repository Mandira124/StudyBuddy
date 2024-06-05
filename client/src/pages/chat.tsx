
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import profilePic from '../assets/profile.png'; // Import profile picture

interface Message {
  text: string;
  file?: File;
  username: string;
  profilePic: string;
}
    const ChatForm: React.FC = () => {
    const [message1, setMessage1] = useState('');
    const [message2, setMessage2] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [file, setFile] = useState<File | undefined>(undefined);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
  
    const handleMessageChange1 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessage1(e.target.value);
      adjustTextareaHeight(e.target);
    };
  
    const handleMessageChange2 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessage2(e.target.value);
      adjustTextareaHeight(e.target);
    };
  
    const adjustTextareaHeight = (textarea: HTMLTextAreaElement | null) => {
      if (!textarea) return;
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    };
    const handleSendMessage1 = () => {
        if (message1.trim() !== '' || file) {
          setMessages((prevMessages) => [...prevMessages, { text: message1, file, username: 'User1', profilePic }]);
          setMessage1('');
          setFile(undefined);
          setTimeout(() => {
            adjustTextareaHeight(document.getElementById('message1') as HTMLTextAreaElement);
          }, 0);
        }
      };
      
      const handleSendMessage2 = () => {
        if (message2.trim() !== '' || file) {
          setMessages((prevMessages) => [...prevMessages, { text: message2, file, username: 'User2', profilePic }]);
          setMessage2('');
          setFile(undefined);
          setTimeout(() => {
            adjustTextareaHeight(document.getElementById('message2') as HTMLTextAreaElement);
          }, 0);
        }
      };
      
      
      
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setFile(e.target.files[0]);
      }
    };
  
    const handleFileInputClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };
  
    useEffect(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, [messages]);
  
    return (
      <div className="flex flex-col h-screen">
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 bg-gray-200">
          {messages.map((msg, index) => (
            <div key={index} className={`flex mb-2 ${msg.username === 'User1' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-1/2 w-1/2 ${msg.username === 'User1' ? 'ml-auto' : 'mr-auto'} rounded-lg p-2 shadow-md break-words mt-1 ${msg.username === 'User1' ? 'bg-blue-800 text-white' : 'bg-green-800 text-white'}`}>
                <div className="flex items-center">
                  <img src={msg.profilePic} alt="Profile" className="w-6 h-6 rounded-full mr-2" />
                  <span className="text-sm">{msg.username}</span>
                </div>
                <div style={{ maxWidth: '100%', overflowWrap: 'break-word' }}>{msg.text}</div>
                {msg.file && (
                  <div className="mt-2 p-2 bg-gray-100 text-gray-800 rounded">
                    {msg.file.name}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-row items-center p-4 bg-white border-t border-gray-400">
        <textarea
            id="message1"
            rows={1}
            placeholder="Type your message..."
            value={message1}
            onChange={handleMessageChange1}
            className="border border-gray-300 px-4 py-2 rounded-lg flex flex-row focus:outline-none mr-2 resize-none w-1/2"
            style={{ minHeight: '38px', maxHeight: '80px' }}
            />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <button className="text-green-800 px-4 py-2 rounded-lg mr-2" onClick={handleFileInputClick}>
            <FontAwesomeIcon icon={faPaperclip} />
          </button>
          <button className="text-green-800 px-4 py-2 rounded-lg" onClick={handleSendMessage1}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
        <div className="flex items-center p-4 bg-white border-t border-gray-400 ">
        <textarea
            id="message2"
            rows={1}
            placeholder="Type your message..."
            value={message2}
            onChange={handleMessageChange2}
            className="border border-gray-300 px-4 py-2 rounded-lg flex flex-row focus:outline-none mr-2 resize-none w-1/2"
            style={{ minHeight: '38px', maxHeight: '80px' }}
            />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <button className="text-green-800 px-4 py-2 rounded-lg mr-2" onClick={handleFileInputClick}>
            <FontAwesomeIcon icon={faPaperclip} />
          </button>
          <button className="text-green-800 px-4 py-2 rounded-lg" onClick={handleSendMessage2}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    );
  };
  
  export default ChatForm;
  