import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventForm from './d2';
import DogSelector from './d3';
import { useUser } from '../User_Context';

const WeeklyCalendar2 = () => {
  const [events, setEvents] = useState([]);
  const [selectedDog, setSelectedDog] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const { user, updateUser } = useUser();

  useEffect(() => {
    if (user && user.dogs && user.dogs.length > 0) {
      setSelectedDog(user.dogs[0].id);
    }
  }, [user]);

  useEffect(() => {
    if (selectedDog) {
      fetchEvents();
    }
  }, [selectedDog]);

  const fetchEvents = () => {
    const dogIndex = user.dogs.findIndex(dog => dog.id === selectedDog);
    if (dogIndex !== -1) {
      setEvents(user.dogs[dogIndex].events || []);
    }
  };

  const addEvent = async (newEvent) => {
    try {
      const updatedUser = { ...user };
      const dogIndex = updatedUser.dogs.findIndex(dog => dog.id === selectedDog);
      if (dogIndex !== -1) {
        if (!updatedUser.dogs[dogIndex].events) {
          updatedUser.dogs[dogIndex].events = [];
        }
        newEvent.id = Date.now().toString(); // 간단한 ID 생성
        updatedUser.dogs[dogIndex].events.push(newEvent);

        const response = await axios.put(`http://localhost:3001/users/${user.id}`, updatedUser);
        updateUser(response.data);
        setEvents(updatedUser.dogs[dogIndex].events);
      }
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const renderWeek = () => {
    const today = new Date();
    const week = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - today.getDay() + i);
      week.push(date);
    }
    return week.map((date) => (
      <div key={date.toISOString()} className="day" onClick={() => handleDateClick(date)}>
        <div className="date">{date.getDate()}</div>
        {renderEvents(date)}
      </div>
    ));
  };

  const renderEvents = (date) => {
    const dayEvents = events.filter(event => new Date(event.date).toDateString() === date.toDateString());
    return dayEvents.map(event => (
      <div key={event.id} className="event">
        <span>{event.time}</span>
        <span>{event.title}</span>
      </div>
    ));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowEventForm(true);
  };

  return (
    <div className="weekly-calendar">
      <DogSelector
        dogs={user?.dogs || []}
        selectedDog={selectedDog}
        onSelect={setSelectedDog}
      />
      <div className="week">{renderWeek()}</div>
      {showEventForm && (
        <EventForm
          onSubmit={addEvent}
          onClose={() => setShowEventForm(false)}
          selectedDate={selectedDate}
          selectedDog={selectedDog}
        />
      )}
    </div>
  );
};

export default WeeklyCalendar2;