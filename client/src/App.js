import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { saveMessage, subscribeToMessages } from './services/firestore';
import ChatBubble from './components/ChatBubble';
import TuitionCard from './components/TuitionCard';
import PaymentCard from './components/PaymentCard';
import UnpaidList from './components/UnpaidList';
import ChatInput from './components/ChatInput';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

function App() {
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState('');
  const chatRef = useRef(null);
  const unsubscribeRef = useRef(null);

  // Initialize session and subscribe to messages
  useEffect(() => {
    let sid = localStorage.getItem('sessionId');
    if (!sid) {
      sid = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('sessionId', sid);
    }
    setSessionId(sid);

    // Subscribe to Firestore messages
    const unsubscribe = subscribeToMessages(sid, (msgs) => {
      setMessages(msgs);
    });

    unsubscribeRef.current = unsubscribe;

    // Add welcome message
    const welcomeMsg = "Merhaba! Harç sorgulama / ödenmemiş harç / ödeme için yazabilirsin.\nHello! You can type: check tuition / unpaid tuition / pay tuition.";
    saveMessage(sid, welcomeMsg, 'bot', {}).catch(console.error);

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (text) => {
    console.log('📤 handleSendMessage called with:', text, 'sessionId:', sessionId);
    if (!text.trim() || !sessionId) return;

    try {
      // Save user message
      await saveMessage(sessionId, text, 'user', {});

      // Send to backend
      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: text }),
      });

      if (!response.ok) {
        throw new Error('Backend error');
      }

      await response.json();

      // Backend will save bot response to Firestore, listener will handle rendering
    } catch (error) {
      console.error('Error sending message:', error);
      await saveMessage(sessionId, 'Bir hata oluştu. / An error occurred.', 'bot', {});
    }
  };

  const handleClearChat = async () => {
    try {
      // Call backend to clear Firestore messages
      await fetch(`${BACKEND_URL}/clear-chat`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });

      // Clear local state
      setMessages([]);

      // Generate new session
      const newSid = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('sessionId', newSid);
      setSessionId(newSid);

      // Unsubscribe from old session
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }

      // Subscribe to new session
      const unsubscribe = subscribeToMessages(newSid, (msgs) => {
        setMessages(msgs);
      });

      unsubscribeRef.current = unsubscribe;

      // Add welcome message
      const welcomeMsg = "Merhaba! Harç sorgulama / ödenmemiş harç / ödeme için yazabilirsin.\nHello! You can type: check tuition / unpaid tuition / pay tuition.";
      await saveMessage(newSid, welcomeMsg, 'bot', {});
    } catch (error) {
      console.error('Error clearing chat:', error);
    }
  };

  const renderMessage = (msg) => {
    const meta = msg.metadata || {};

    // TuitionCard
    if (meta.type === 'tuition') {
      return <TuitionCard key={msg.id} data={meta} />;
    }

    // PaymentCard
    if (meta.type === 'payment') {
      return <PaymentCard key={msg.id} data={meta} sessionId={sessionId} />;
    }

    // UnpaidList
    if (meta.type === 'unpaid') {
      return <UnpaidList key={msg.id} data={meta} />;
    }

    // Regular chat bubble
    return <ChatBubble key={msg.id} role={msg.role} message={msg.message} />;
  };

  return (
    <div className="app">
      <div className="header">
        <div className="title">AI Tuition Agent (React)</div>
        <div className="subtitle">SE 4458 - AI Agent Assignment</div>
        <button className="clear-btn" onClick={handleClearChat}>
          Clear Chat
        </button>
      </div>

      <div className="chat" ref={chatRef}>
        {messages.map(renderMessage)}
      </div>

      <ChatInput onSend={handleSendMessage} />
    </div>
  );
}

export default App;
