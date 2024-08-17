import React, { useState, useEffect } from 'react';
import DailyView from './c2';
import WeeklyView from './c3';
import MonthlyView from './c4';
import EventDetails from './c5';
import './c1.css';

const Calendar2 = ({ userId, dogId }) => {
  const [view, setView] = useState('daily');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, [userId, dogId, selectedDate]);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`/api/users/${userId}/dogs/${dogId}/todos`);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    if (view !== 'daily') {
      setShowEventDetails(true);
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const handleAddEvent = async (newEvent) => {
    try {
      const response = await fetch(`/api/users/${userId}/dogs/${dogId}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });
      if (response.ok) {
        fetchEvents();
      }
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleUpdateEvent = async (updatedEvent) => {
    try {
      const response = await fetch(`/api/users/${userId}/dogs/${dogId}/todos/${updatedEvent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEvent),
      });
      if (response.ok) {
        fetchEvents();
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(`/api/users/${userId}/dogs/${dogId}/todos/${eventId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchEvents();
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => setView('daily')}>일간</button>
        <button onClick={() => setView('weekly')}>주간</button>
        <button onClick={() => setView('monthly')}>월간</button>
      </div>
      {view === 'daily' && (
        <DailyView
          date={selectedDate}
          events={events}
          onEventClick={handleEventClick}
          onAddEvent={handleAddEvent}
        />
      )}
      {view === 'weekly' && (
        <WeeklyView
          date={selectedDate}
          events={events}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
        />
      )}
      {view === 'monthly' && (
        <MonthlyView
          date={selectedDate}
          events={events}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
        />
      )}
      {showEventDetails && (
        <EventDetails
          event={selectedEvent}
          onClose={() => setShowEventDetails(false)}
          onUpdate={handleUpdateEvent}
          onDelete={handleDeleteEvent}
        />
      )}
    </div>
  );
};

export default Calendar2;