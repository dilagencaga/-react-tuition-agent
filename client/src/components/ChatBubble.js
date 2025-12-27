import React from 'react';

function ChatBubble({ role, message }) {
  return (
    <div className={`row ${role}`}>
      <div className="bubble">{message}</div>
    </div>
  );
}

export default ChatBubble;
