import React from 'react';
import './c2.css';

const DailyView = ({ date, events, onEventClick, onAddEvent }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventsForHour = (hour) => {
    return events.filter(event => {
      const eventHour = new Date(event.date + 'T' + event.time).getHours();
      return eventHour === hour;
    });
  };

  const handleAddEvent = (hour) => {
    const newEvent = {
      title: 'New Event',
      date: date.toISOString().split('T')[0],
      time: `${hour.toString().padStart(2, '0')}:00`,
      description: '',
    };
    onAddEvent(newEvent);
  };

  return (
    <div className="daily-view">
      <h2>{date.toDateString()}</h2>
      <div className="time-slots">
        {hours.map(hour => (
          <div key={hour} className="time-slot">
            <div className="hour">{hour.toString().padStart(2, '0')}:00</div>
            <div className="events">
              {getEventsForHour(hour).map(event => (
                <div
                  key={event.id}
                  className="event"
                  onClick={() => onEventClick(event)}
                >
                  {event.title}
                </div>
              ))}
              <button className="add-event" onClick={() => handleAddEvent(hour)}>+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyView;