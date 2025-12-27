import React, { useState } from 'react';

function ChatInput({ onSend }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="composer" onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        placeholder="Mesaj yaz... (örn: harç sorgulama)"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button type="submit" className="btn">
        Gönder
      </button>
    </form>
  );
}

export default ChatInput;
