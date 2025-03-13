import React from 'react';

const MessageAlert = ({ message, timerText, variant = 'warning' }) => {
  return (
    <div className={`alert alert-${variant} shadow-sm`} role="alert">
      <p className="mb-2">{message}</p>
      {timerText && <p className="timer mb-0">{timerText}</p>}
    </div>
  );
};

export default MessageAlert;