import React, { useState } from 'react';
import './c5.css';

const EventDetails = ({ event, onClose, onUpdate, onDelete }) => {
  const [title, setTitle] = useState(event ? event.title : '');
  const [date, setDate] = useState(event ? event.date : '');
  const [time, setTime] = useState(event ? event.time : '');
  const [description, setDescription] = useState(event ? event.description : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEvent = {
      ...event,
      title,
      date,
      time,
      description,
    };
    onUpdate(updatedEvent);
    onClose();
  };

  const handleDelete = () => {
    onDelete(event.id);
    onClose();
  };

  return (
    <div className="event-details">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="설명"
        />
        <div className="buttons">
          <button type="submit">저장</button>
          {event && <button type="button" onClick={handleDelete}>삭제</button>}
          <button type="button" onClick={onClose}>취소</button>
        </div>
      </form>
    </div>
  );
};

export default EventDetails;