import React, { useState, useEffect } from 'react';
import { useUser } from './User_Context';
import './Test2.css';

const WeeklyCalendar = () => {
  const { user } = useUser();
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDog, setSelectedDog] = useState('all');
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    // 여기서 서버로부터 이벤트를 가져오는 로직을 구현합니다.
    // 예시 데이터:
    setEvents([
      { id: 1, dogId: 1, title: '산책', date: new Date(2024, 7, 16, 10, 0), duration: 60 },
      { id: 2, dogId: 2, title: '병원', date: new Date(2024, 7, 17, 14, 0), duration: 90 },
    ]);
  }, []);

  const getWeekDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeek);
      date.setDate(currentWeek.getDate() - currentWeek.getDay() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates();

  const filteredEvents = events.filter(event => 
    selectedDog === 'all' || event.dogId === parseInt(selectedDog)
  );

  const addEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: events.length + 1 }]);
    setShowEventForm(false);
  };

  const updateEvent = (updatedEvent) => {
    setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    setSelectedEvent(null);
    setShowEventForm(false);
  };

  const deleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    setSelectedEvent(null);
  };

  return (
    <div className="weekly-calendar">
      <h2>주간 일정</h2>
      <div className="calendar-controls">
        <button onClick={() => setCurrentWeek(new Date(currentWeek.setDate(currentWeek.getDate() - 7)))}>
          이전 주
        </button>
        <select value={selectedDog} onChange={(e) => setSelectedDog(e.target.value)}>
          <option value="all">전체</option>
          {user.dogs.map(dog => (
            <option key={dog.id} value={dog.id}>{dog.name}</option>
          ))}
        </select>
        <button onClick={() => setCurrentWeek(new Date(currentWeek.setDate(currentWeek.getDate() + 7)))}>
          다음 주
        </button>
      </div>
      <div className="calendar-grid">
        {weekDates.map(date => (
          <div key={date.toISOString()} className="calendar-day">
            <div className="date-header">
              {date.toLocaleDateString('ko-KR', { weekday: 'short', month: 'numeric', day: 'numeric' })}
            </div>
            <div className="events-list">
              {filteredEvents
                .filter(event => event.date.toDateString() === date.toDateString())
                .map(event => (
                  <div key={event.id} className="event" onClick={() => setSelectedEvent(event)}>
                    {event.title}
                  </div>
                ))
              }
            </div>
          </div>
        ))}
      </div>
      <button className="add-event-button" onClick={() => setShowEventForm(true)}>일정 추가</button>
      {(showEventForm || selectedEvent) && (
        <EventForm
          event={selectedEvent}
          onSave={selectedEvent ? updateEvent : addEvent}
          onDelete={deleteEvent}
          onCancel={() => {
            setShowEventForm(false);
            setSelectedEvent(null);
          }}
          dogs={user.dogs}
        />
      )}
    </div>
  );
};

const EventForm = ({ event, onSave, onDelete, onCancel, dogs }) => {
  const [title, setTitle] = useState(event ? event.title : '');
  const [date, setDate] = useState(event ? event.date.toISOString().substr(0, 16) : '');
  const [duration, setDuration] = useState(event ? event.duration : 60);
  const [dogId, setDogId] = useState(event ? event.dogId : dogs[0].id);

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = {
      id: event ? event.id : null,
      title,
      date: new Date(date),
      duration: parseInt(duration),
      dogId: parseInt(dogId)
    };
    onSave(eventData);
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="일정 제목"
        required
      />
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="소요 시간 (분)"
        required
      />
      <select value={dogId} onChange={(e) => setDogId(e.target.value)}>
        {dogs.map(dog => (
          <option key={dog.id} value={dog.id}>{dog.name}</option>
        ))}
      </select>
      <button type="submit">{event ? '수정' : '추가'}</button>
      {event && <button type="button" onClick={() => onDelete(event.id)}>삭제</button>}
      <button type="button" onClick={onCancel}>취소</button>
    </form>
  );
};

export default WeeklyCalendar;