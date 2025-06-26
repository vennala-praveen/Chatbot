import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { id: uuidv4(), sender: 'bot', text: 'Hi! I am your assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage = { id: uuidv4(), sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const botReply = getBotResponse(input);
      const botMessage = { id: uuidv4(), sender: 'bot', text: botReply };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);

    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const getBotResponse = (input) => {
    const msg = input.toLowerCase();
    if (msg.includes('hello') || msg.includes('hi')) return 'Hello there!';
    if (msg.includes('how are you')) return 'I am a bot, but doing great!';
    if (msg.includes('i have one question')) return 'Yeah, please tell me, what can i help you';
    if (msg.includes('bye')) return 'Goodbye! Have a nice day!';
    return 'Sorry, I didn’t understand that.';
  };

  return (
    <div className="app-container">
      <h1>Smart Chatbot</h1>
      <div className="chat-container">
        <div className="chat-box">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-message ${msg.sender}`}>
              <span>{msg.text}</span>
            </div>
          ))}
        </div>
        <div className="input-area">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;