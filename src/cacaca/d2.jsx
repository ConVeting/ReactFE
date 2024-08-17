import React, { useState } from 'react';

const EventForm = ({ onSubmit, onClose, selectedDate, selectedDog }) => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      time,
      date: selectedDate.toISOString(),
      dogId: selectedDog
    });
    onClose();
  };

  return (
    <div className="event-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="일정 제목"
          required
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <button type="submit">저장</button>
        <button type="button" onClick={onClose}>취소</button>
      </form>
    </div>
  );
};

export default EventForm;