import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginComponent from './component/LoginComponent';
import './App.css';

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);

    const userInput = input;
    setInput('');

    try {
      const response = await fetch('http://localhost:3002/api/chat', { // replace with your chat API
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userQuery: userInput }),
      });

      const data = await response.json();
      let botText = '';
      // Safely handle object or string
      if (typeof data.response === 'string') {
        botText = data.response;
      } else if (typeof data.response === 'object') {
        botText = JSON.stringify(data.response);
      } else {
        botText = String(data.response);
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: botText }]);
    } catch (error) {
      console.log(error);
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Error: ' + error.message }]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === 'user' ? 'user-msg' : 'bot-msg'}>
            {typeof msg.text === 'string' ? msg.text : JSON.stringify(msg.text)}
          </div>
        ))}
      </div>
      <form className="chat-input" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginComponent onLoginSuccess={() => window.location.href = '/chat'} />} />
        <Route path="/chat" element={<ChatWindow />} />
      </Routes>
    </Router>
  );
}

export default App;