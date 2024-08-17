import React from 'react';
import './c3.css';

const WeeklyView = ({ date, events, onDateClick, onEventClick }) => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay());

  const days = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    return day;
  });

  const getEventsForDay = (day) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === day.toDateString();
    });
  };

  return (
    <div className="weekly-view">
      <div className="days">
        {days.map(day => (
          <div key={day.toISOString()} className="day" onClick={() => onDateClick(day)}>
            <div className="date">{day.getDate()}</div>
            <div className="events">
              {getEventsForDay(day).map(event => (
                <div
                  key={event.id}
                  className="event"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick(event);
                  }}
                >
                  {event.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyView;