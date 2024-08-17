// import React, { useState, useMemo } from 'react';
// import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
// import format from 'date-fns/format';
// import parse from 'date-fns/parse';
// import startOfWeek from 'date-fns/startOfWeek';
// import getDay from 'date-fns/getDay';
// import enUS from 'date-fns/locale/en-US';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import {
//   TextField,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Box,
//   Chip,
// } from '@mui/material';
// import { TimePicker } from '@mui/x-date-pickers';
// import { DatePicker } from '@mui/x-date-pickers';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';



// const locales = {
//   'en-US': enUS,
// };

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// });

// const people = ['Person 1', 'Person 2', 'Person 3'];
// const categories = ['Work', 'Personal', 'Meeting', 'Other'];
// const colors = ['#3174ad', '#32a852', '#a83232', '#a87d32'];

// const CalendarApp = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [filters, setFilters] = useState({ people: [], categories: [] });

//   const [newEvent, setNewEvent] = useState({
//     title: '',
//     start: new Date(),
//     end: new Date(),
//     person: '',
//     category: '',
//     color: colors[0],
//   });

//   const handleSelectSlot = (slotInfo) => {
//     setSelectedEvent(null);
//     setNewEvent({
//       title: '',
//       start: slotInfo.start,
//       end: slotInfo.end,
//       person: '',
//       category: '',
//       color: colors[0],
//     });
//     setIsModalOpen(true);
//   };

//   const handleSelectEvent = (event) => {
//     setSelectedEvent(event);
//     setNewEvent({ ...event });
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedEvent(null);
//     setNewEvent({
//       title: '',
//       start: new Date(),
//       end: new Date(),
//       person: '',
//       category: '',
//       color: colors[0],
//     });
//   };

//   const handleSaveEvent = () => {
//     if (selectedEvent) {
//       setEvents(events.map((e) => (e.id === selectedEvent.id ? newEvent : e)));
//     } else {
//       setEvents([...events, { ...newEvent, id: Date.now() }]);
//     }
//     handleCloseModal();
//   };

//   const handleDeleteEvent = () => {
//     setEvents(events.filter((e) => e.id !== selectedEvent.id));
//     handleCloseModal();
//   };

//   const handleFilterChange = (type, value) => {
//     setFilters({ ...filters, [type]: value });
//   };

//   const filteredEvents = useMemo(() => {
//     return events.filter((event) => {
//       const personMatch = filters.people.length === 0 || filters.people.includes(event.person);
//       const categoryMatch = filters.categories.length === 0 || filters.categories.includes(event.category);
//       return personMatch && categoryMatch;
//     });
//   }, [events, filters]);

//   return (
//     <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
//       <Box sx={{ mb: 2 }}>
//         <FormControl sx={{ m: 1, minWidth: 120 }}>
//           <InputLabel>People</InputLabel>
//           <Select
//             multiple
//             value={filters.people}
//             onChange={(e) => handleFilterChange('people', e.target.value)}
//             renderValue={(selected) => (
//               <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                 {selected.map((value) => (
//                   <Chip key={value} label={value} />
//                 ))}
//               </Box>
//             )}
//           >
//             {people.map((name) => (
//               <MenuItem key={name} value={name}>
//                 {name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <FormControl sx={{ m: 1, minWidth: 120 }}>
//           <InputLabel>Categories</InputLabel>
//           <Select
//             multiple
//             value={filters.categories}
//             onChange={(e) => handleFilterChange('categories', e.target.value)}
//             renderValue={(selected) => (
//               <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                 {selected.map((value) => (
//                   <Chip key={value} label={value} />
//                 ))}
//               </Box>
//             )}
//           >
//             {categories.map((category) => (
//               <MenuItem key={category} value={category}>
//                 {category}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Box>
//       <Box sx={{ flexGrow: 1 }}>
//         <Calendar
//           localizer={localizer}
//           events={filteredEvents}
//           startAccessor="start"
//           endAccessor="end"
//           onSelectEvent={handleSelectEvent}
//           onSelectSlot={handleSelectSlot}
//           selectables
//           style={{ height: '100%' }}
//           eventPropGetter={(event) => ({
//             style: {
//               backgroundColor: event.color,
//             },
//           })}
//         />
//       </Box>
//       <Dialog open={isModalOpen} onClose={handleCloseModal}>
//         <DialogTitle>{selectedEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Title"
//             fullWidth
//             value={newEvent.title}
//             onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
//           />
//           <LocalizationProvider dateAdapter={AdapterDateFns}>
//             <DatePicker
//               label="Start Date"
//               value={newEvent.start}
//               onChange={(date) => setNewEvent({ ...newEvent, start: date })}
//               renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
//             />
//             <TimePicker
//               label="Start Time"
//               value={newEvent.start}
//               onChange={(time) => setNewEvent({ ...newEvent, start: time })}
//               renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
//             />
//             <DatePicker
//               label="End Date"
//               value={newEvent.end}
//               onChange={(date) => setNewEvent({ ...newEvent, end: date })}
//               renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
//             />
//             <TimePicker
//               label="End Time"
//               value={newEvent.end}
//               onChange={(time) => setNewEvent({ ...newEvent, end: time })}
//               renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
//             />
//           </LocalizationProvider>
//           <FormControl fullWidth margin="dense">
//             <InputLabel>Person</InputLabel>
//             <Select
//               value={newEvent.person}
//               onChange={(e) => setNewEvent({ ...newEvent, person: e.target.value })}
//             >
//               {people.map((person) => (
//                 <MenuItem key={person} value={person}>
//                   {person}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <FormControl fullWidth margin="dense">
//             <InputLabel>Category</InputLabel>
//             <Select
//               value={newEvent.category}
//               onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
//             >
//               {categories.map((category) => (
//                 <MenuItem key={category} value={category}>
//                   {category}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <FormControl fullWidth margin="dense">
//             <InputLabel>Color</InputLabel>
//             <Select
//               value={newEvent.color}
//               onChange={(e) => setNewEvent({ ...newEvent, color: e.target.value })}
//             >
//               {colors.map((color) => (
//                 <MenuItem key={color} value={color} style={{ backgroundColor: color }}>
//                   &nbsp;
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           {selectedEvent && (
//             <Button onClick={handleDeleteEvent} color="error">
//               Delete
//             </Button>
//           )}
//           <Button onClick={handleCloseModal}>Cancel</Button>
//           <Button onClick={handleSaveEvent} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default CalendarApp;

// import React, { useState, useEffect } from 'react';
// import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';

// // 스타일은 별도의 CSS 파일로 분리하는 것이 좋습니다.
// const styles = {
//   calendar: {
//     fontFamily: 'Arial, sans-serif',
//     border: '1px solid #ddd',
//     borderRadius: '5px',
//     padding: '10px',
//   },
//   header: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '10px',
//   },
//   dayNames: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(7, 1fr)',
//     gap: '5px',
//     marginBottom: '5px',
//   },
//   dayName: {
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   days: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(7, 1fr)',
//     gap: '5px',
//   },
//   day: {
//     border: '1px solid #ddd',
//     padding: '5px',
//     textAlign: 'center',
//     cursor: 'pointer',
//   },
//   today: {
//     backgroundColor: '#f0f0f0',
//     fontWeight: 'bold',
//   },
//   otherMonth: {
//     color: '#ccc',
//   },
//   event: {
//     backgroundColor: '#e6f3ff',
//     borderRadius: '3px',
//     padding: '2px',
//     marginTop: '2px',
//     fontSize: '12px',
//   },
//   modal: {
//     position: 'fixed',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     backgroundColor: 'white',
//     padding: '20px',
//     borderRadius: '5px',
//     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '10px',
//   },
//   input: {
//     padding: '5px',
//     borderRadius: '3px',
//     border: '1px solid #ddd',
//   },
//   button: {
//     padding: '5px 10px',
//     borderRadius: '3px',
//     border: 'none',
//     backgroundColor: '#007bff',
//     color: 'white',
//     cursor: 'pointer',
//   },
// };

// const CalendarApp = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [events, setEvents] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });

//   const renderHeader = () => {
//     return (
//       <div style={styles.header}>
//         <button onClick={() => setCurrentDate(subMonths(currentDate, 1))}>Prev</button>
//         <h2>{format(currentDate, 'MMMM yyyy')}</h2>
//         <button onClick={() => setCurrentDate(addMonths(currentDate, 1))}>Next</button>
//       </div>
//     );
//   };

//   const renderDays = () => {
//     const dateFormat = "EEEE";
//     const days = [];
//     let startDate = startOfWeek(currentDate);

//     for (let i = 0; i < 7; i++) {
//       days.push(
//         <div key={i} style={styles.dayName}>
//           {format(addDays(startDate, i), dateFormat)}
//         </div>
//       );
//     }

//     return <div style={styles.dayNames}>{days}</div>;
//   };

//   const renderCells = () => {
//     const monthStart = startOfMonth(currentDate);
//     const monthEnd = endOfMonth(monthStart);
//     const startDate = startOfWeek(monthStart);
//     const endDate = endOfWeek(monthEnd);

//     const rows = [];
//     let days = [];
//     let day = startDate;

//     while (day <= endDate) {
//       for (let i = 0; i < 7; i++) {
//         const cloneDay = day;
//         days.push(
//           <div
//             key={day}
//             style={{
//               ...styles.day,
//               ...(isSameMonth(day, monthStart) ? {} : styles.otherMonth),
//               ...(isSameDay(day, new Date()) ? styles.today : {})
//             }}
//             onClick={() => handleDateClick(cloneDay)}
//           >
//             <span>{format(day, 'd')}</span>
//             {events
//               .filter(event => isSameDay(new Date(event.start), cloneDay))
//               .map((event, index) => (
//                 <div key={index} style={styles.event}>{event.title}</div>
//               ))
//             }
//           </div>
//         );
//         day = addDays(day, 1);
//       }
//       rows.push(
//         <div key={day} style={styles.days}>
//           {days}
//         </div>
//       );
//       days = [];
//     }
//     return <div>{rows}</div>;
//   };

//   const handleDateClick = (day) => {
//     setSelectedDate(day);
//     setShowModal(true);
//     setNewEvent({ ...newEvent, start: format(day, 'yyyy-MM-dd'), end: format(day, 'yyyy-MM-dd') });
//   };

//   const handleEventSubmit = (e) => {
//     e.preventDefault();
//     setEvents([...events, { ...newEvent, id: Date.now() }]);
//     setShowModal(false);
//     setNewEvent({ title: '', start: '', end: '' });
//   };

//   return (
//     <div style={styles.calendar}>
//       {renderHeader()}
//       {renderDays()}
//       {renderCells()}
//       {showModal && (
//         <div style={styles.modal}>
//           <form onSubmit={handleEventSubmit} style={styles.form}>
//             <input
//               type="text"
//               placeholder="Event Title"
//               value={newEvent.title}
//               onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
//               style={styles.input}
//               required
//             />
//             <input
//               type="date"
//               value={newEvent.start}
//               onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
//               style={styles.input}
//               required
//             />
//             <input
//               type="date"
//               value={newEvent.end}
//               onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
//               style={styles.input}
//               required
//             />
//             <button type="submit" style={styles.button}>Add Event</button>
//             <button type="button" onClick={() => setShowModal(false)} style={styles.button}>Cancel</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CalendarApp;

import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
const styles = {
  calendar: {
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  dayNames: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '5px',
    marginBottom: '5px',
  },
  dayName: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  days: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '5px',
  },
  day: {
    border: '1px solid #ddd',
    padding: '5px',
    textAlign: 'center',
    cursor: 'pointer',
  },
  today: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  otherMonth: {
    color: '#ccc',
  },
  event: {
    backgroundColor: '#e6f3ff',
    borderRadius: '3px',
    padding: '2px',
    marginTop: '2px',
    fontSize: '12px',
  },
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '5px',
    borderRadius: '3px',
    border: '1px solid #ddd',
  },
  button: {
    padding: '5px 10px',
    borderRadius: '3px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
};
// 스타일은 이전과 동일하므로 생략합니다.

// 가상의 사용자 인증 함수
const fakeAuth = {
  isAuthenticated: false,
  signin(callback) {
    fakeAuth.isAuthenticated = true;
    setTimeout(callback, 100);
  },
  signout(callback) {
    fakeAuth.isAuthenticated = false;
    setTimeout(callback, 100);
  }
};

const CalendarApp = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '', dogId: '' });
  const [editingEvent, setEditingEvent] = useState(null);
  const [user, setUser] = useState(null);
  const [dogs, setDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState('all');

  // 사용자 로그인 시뮬레이션
  useEffect(() => {
    fakeAuth.signin(() => {
      setUser({ id: 1, name: 'Test User' });
      setDogs([
        { id: 1, name: '강아지1' },
        { id: 2, name: '강아지2' },
      ]);
    });
  }, []);

  // 이벤트 필터링
  const filteredEvents = events.filter(event => 
    selectedDog === 'all' || event.dogId === selectedDog
  );

  const handleDateClick = (day) => {
    if (!user) return; // 로그인하지 않은 경우 리턴
    setSelectedDate(day);
    setShowModal(true);
    setNewEvent({ title: '', start: format(day, 'yyyy-MM-dd'), end: format(day, 'yyyy-MM-dd'), dogId: '' });
    setEditingEvent(null);
  };

  const handleEventClick = (event) => {
    if (!user) return; // 로그인하지 않은 경우 리턴
    setShowModal(true);
    setNewEvent({ ...event });
    setEditingEvent(event);
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    if (editingEvent) {
      // 이벤트 수정
      setEvents(events.map(event => 
        event.id === editingEvent.id ? { ...newEvent, id: event.id } : event
      ));
    } else {
      // 새 이벤트 추가
      setEvents([...events, { ...newEvent, id: Date.now(), userId: user.id }]);
    }
    setShowModal(false);
    setNewEvent({ title: '', start: '', end: '', dogId: '' });
    setEditingEvent(null);
  };

  const handleEventDelete = () => {
    if (editingEvent) {
      setEvents(events.filter(event => event.id !== editingEvent.id));
      setShowModal(false);
      setNewEvent({ title: '', start: '', end: '', dogId: '' });
      setEditingEvent(null);
    }
  };

  const renderHeader = () => {
    return (
      <div style={styles.header}>
        <button onClick={() => setCurrentDate(subMonths(currentDate, 1))}>Prev</button>
        <h2>{format(currentDate, 'MMMM yyyy')}</h2>
        <button onClick={() => setCurrentDate(addMonths(currentDate, 1))}>Next</button>
        <select 
          value={selectedDog} 
          onChange={(e) => setSelectedDog(e.target.value)}
          style={styles.select}
        >
          <option value="all">모든 강아지</option>
          {dogs.map(dog => (
            <option key={dog.id} value={dog.id}>{dog.name}</option>
          ))}
        </select>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "EEEE";
    const days = [];
    let startDate = startOfWeek(currentDate);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} style={styles.dayName}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div style={styles.dayNames}>{days}</div>;
  };

  // renderDays 함수는 이전과 동일하므로 생략합니다.

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        days.push(
          <div
            key={day}
            style={{
              ...styles.day,
              ...(isSameMonth(day, monthStart) ? {} : styles.otherMonth),
              ...(isSameDay(day, new Date()) ? styles.today : {})
            }}
            onClick={() => handleDateClick(cloneDay)}
          >
            <span>{format(day, 'd')}</span>
            {filteredEvents
              .filter(event => isSameDay(new Date(event.start), cloneDay))
              .map((event, index) => (
                <div 
                  key={index} 
                  style={{...styles.event, backgroundColor: dogs.find(dog => dog.id === event.dogId)?.color || '#e6f3ff'}}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEventClick(event);
                  }}
                >
                  {event.title}
                </div>
              ))
            }
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day} style={styles.days}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.calendar}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      {showModal && (
        <div style={styles.modal}>
          <form onSubmit={handleEventSubmit} style={styles.form}>
            <input
              type="text"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              style={styles.input}
              required
            />
            <input
              type="date"
              value={newEvent.start}
              onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
              style={styles.input}
              required
            />
            <input
              type="date"
              value={newEvent.end}
              onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
              style={styles.input}
              required
            />
            <select
              value={newEvent.dogId}
              onChange={(e) => setNewEvent({ ...newEvent, dogId: e.target.value })}
              style={styles.input}
              required
            >
              <option value="">강아지 선택</option>
              {dogs.map(dog => (
                <option key={dog.id} value={dog.id}>{dog.name}</option>
              ))}
            </select>
            <button type="submit" style={styles.button}>
              {editingEvent ? 'Update Event' : 'Add Event'}
            </button>
            {editingEvent && (
              <button type="button" onClick={handleEventDelete} style={{...styles.button, backgroundColor: '#dc3545'}}>
                Delete Event
              </button>
            )}
            <button type="button" onClick={() => setShowModal(false)} style={styles.button}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CalendarApp;

