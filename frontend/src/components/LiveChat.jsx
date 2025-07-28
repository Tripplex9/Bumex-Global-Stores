import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const LiveChat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => socket.off('message');
  }, []);

  const sendMessage = () => {
    socket.emit('chatMessage', { text: message, user: 'Customer' });
    setMessage('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-lg w-64"
    >
      <h3 className="font-bold mb-2">Live Chat</h3>
      <div className="h-40 overflow-y-auto mb-2">
        {messages.map((msg, i) => (
          <div key={i}>{msg.user}: {msg.text}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 text-black rounded"
      />
      <button onClick={sendMessage} className="bg-white text-blue-600 p-2 rounded mt-2 w-full">
        Send
      </button>
    </motion.div>
  );
};

export default LiveChat;
