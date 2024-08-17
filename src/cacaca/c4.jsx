import React from 'react';
import './c4.css';

const MonthlyView = ({ date, events, onDateClick, onEventClick }) => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const weeks = [];
  let currentWeek = [];
  let currentDate = new Date(startDate);

  while (currentDate <= lastDayOfMonth) {
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }

    currentWeek.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  const getEventsForDay = (day) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === day.toDateString();
    });
  };

  return (
    <div className="monthly-view">
      <h2>{date.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
      <div className="calendar">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="week">
            {week.map(day => (
              <div
                key={day.toISOString()}
                className={`day ${day.getMonth() !== date.getMonth() ? 'other-month' : ''}`}
                onClick={() => onDateClick(day)}
              >
                <div className="date">{day.getDate()}</div>
                <div className="events">
                  {getEventsForDay(day).slice(0, 3).map(event => (
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
                  {getEventsForDay(day).length > 3 && (
                    <div className="more-events">+{getEventsForDay(day).length - 3} more</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyView;