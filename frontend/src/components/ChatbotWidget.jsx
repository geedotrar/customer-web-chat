import React, { useState, useRef } from 'react';
import '../styles/ChatbotWidget.css';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: "bot", text: "Ask me about Flin or Loans.." }]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (input.trim() === '') return;

    setMessages((prev) => [...prev, { sender: 'user', text: input }]);
    setInput('');

    const botResponse = await getBotResponse(input);

    typeBotMessage(botResponse);
  };

  const getBotResponse = async (userMessage) => {
    try {
      const response = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      return data.reply;
    } catch (error) {
      return "Something went wrong";
    }
  };

  const typeBotMessage = (message) => {
    let idx = 0;
    const totalMessage = message.trim();
    let currentMessage = '';
  
    const interval = setInterval(() => {
      currentMessage += totalMessage[idx];
      setMessages((prev) => {
        const newMessages = [...prev];
        if (newMessages[newMessages.length - 1]?.sender === 'bot') {
          newMessages[newMessages.length - 1].text = currentMessage;
        } else {
          newMessages.push({ sender: 'bot', text: currentMessage });
        }
        return newMessages;
      });
  
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
  
      idx++;
      if (idx === totalMessage.length) {
        clearInterval(interval);
      }
    }, 30);
  };
  

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  const formatMessage = (message) => {
    return message.split('\n').map((part, index) => (
      <span key={index}>
        {part}
        {index < message.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className="chatbot-widget">
      {!isOpen && (
        <div className="chatbot-toggle-button" onClick={toggleWidget}>
          💬
        </div>
      )}

      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <span>FLIN</span>
            <button onClick={toggleWidget}>✖</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={msg.sender === 'user' ? 'user' : 'bot'}>
                {msg.sender === 'bot' && <div className="icon"></div>}
                <div className="message">
                  {msg.sender === 'bot' ? formatMessage(msg.text) : msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-area">
            <input
              type="text"
              placeholder="Ask me..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
