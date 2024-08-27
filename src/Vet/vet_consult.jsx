import React, { useState, useEffect } from 'react';
import './vet_consult.css';

function Vet_consult() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('전체');

  useEffect(() => {
    // 예시 데이터에 Zoom 링크 추가
    const fakeAppointments = [
        { id: 1, user_name: "김철수", name: "멍멍이", date: "2024-08-24", time: "14:00", status: "완료", zoomLink: "https://zoom.us/j/1234567890" },
        { id: 2, user_name: "이영희", name: "야옹이", date: "2024-08-25", time: "10:30", status: "완료", zoomLink: "https://zoom.us/j/2345678901" },
        { id: 3, user_name: "박지민", name: "토끼", date: "2024-08-30", time: "16:00", status: "대기중", zoomLink: "https://zoom.us/j/3456789012" },
        { id: 4, user_name: "최동훈", name: "해피", date: "2024-08-27", time: "09:00", status: "확정", zoomLink: "https://zoom.us/j/4567890123" },
        { id: 5, user_name: "정수민", name: "루시", date: "2024-08-27", time: "11:30", status: "완료", zoomLink: "https://zoom.us/j/5678901234" },
        { id: 6, user_name: "강민준", name: "코코", date: "2024-09-01", time: "15:00", status: "대기중", zoomLink: "https://zoom.us/j/6789012345" },
        { id: 7, user_name: "윤서연", name: "벨라", date: "2024-09-02", time: "13:30", status: "확정", zoomLink: "https://zoom.us/j/7890123456" },
        { id: 8, user_name: "임재현", name: "맥스", date: "2024-09-03", time: "10:00", status: "대기중", zoomLink: "https://zoom.us/j/8901234567" },
        { id: 9, user_name: "송지은", name: "모카", date: "2024-09-04", time: "16:30", status: "거절", zoomLink: "https://zoom.us/j/9012345678" },
        { id: 10, user_name: "홍길동", name: "뽀삐", date: "2024-09-05", time: "14:30", status: "대기중", zoomLink: "https://zoom.us/j/0123456789" },
        { id: 11, user_name: "김민지", name: "초코", date: "2024-08-31", time: "11:00", status: "확정", zoomLink: "https://zoom.us/j/1234567890" },
        { id: 12, user_name: "이승우", name: "나비", date: "2024-09-06", time: "09:30", status: "대기중", zoomLink: "https://zoom.us/j/2345678901" },
        { id: 13, user_name: "박서윤", name: "레오", date: "2024-09-07", time: "17:00", status: "대기중", zoomLink: "https://zoom.us/j/3456789012" },
        { id: 14, user_name: "정도윤", name: "미미", date: "2024-09-08", time: "13:00", status: "확정", zoomLink: "https://zoom.us/j/4567890123" },
        { id: 15, user_name: "최예린", name: "쿠키", date: "2024-09-09", time: "10:30", status: "대기중", zoomLink: "https://zoom.us/j/5678901234" }
      ];
    setAppointments(fakeAppointments);
  }, []);

  const handleAccept = (id) => {
    setAppointments(appointments.map(app => 
      app.id === id ? {...app, status: "확정"} : app
    ));
    // 실제 구현에서는 여기서 서버에 상태 변경을 알려야 합니다.
  };

  const handleReject = (id) => {
    setAppointments(appointments.map(app => 
      app.id === id ? {...app, status: "거절"} : app
    ));
    // 실제 구현에서는 여기서 서버에 상태 변경을 알려야 합니다.
  };

  const handleComplete = (id) => {
    setAppointments(appointments.map(app => 
      app.id === id ? {...app, status: "완료"} : app
    ));
    // 실제 구현에서는 여기서 서버에 상태 변경을 알려야 합니다.
  };

  const filterAppointments = () => {
    const today = new Date();
    const oneWeekLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const twoMonthsLater = new Date(today.getFullYear(), today.getMonth() + 2, 1);

    return appointments.filter(app => {
      const appDate = new Date(app.date);
      switch(filter) {
        case '오늘':
          return appDate.toDateString() === today.toDateString();
        case '이번주':
          return appDate >= today && appDate < oneWeekLater;
        case '이번달':
          return appDate.getMonth() === today.getMonth() && appDate.getFullYear() === today.getFullYear();
        case '다음달':
          return appDate >= nextMonth && appDate < twoMonthsLater;
        default:
          return true;
      }
    });
  };

  return (
    <div className="vet-appointments">
      <h2>예약 관리</h2>
      <div className="filter-buttons">
        {['전체', '오늘', '이번주', '이번달', '다음달'].map(filterOption => (
          <button 
            key={filterOption} 
            onClick={() => setFilter(filterOption)}
            className={filter === filterOption ? 'active' : ''}
          >
            {filterOption}
          </button>
        ))}
      </div>
      <table>
        <thead>
          <tr>
            <th>반려동물 주인</th>
            <th>반려동물 이름</th>
            <th>날짜</th>
            <th>시간</th>
            <th>상태</th>
            <th>액션</th>
          </tr>
        </thead>
        <tbody>
          {filterAppointments().map(app => (
            <tr key={app.id}>
                <td data-label="반려동물 주인">{app.user_name}</td>
                <td data-label="반려동물 이름">{app.name}</td>
                <td data-label="날짜">{app.date}</td>
                <td data-label="시간">{app.time}</td>
                <td data-label="상태">{app.status}</td>
              <td>
                {app.status === "대기중" && (
                  <>
                    <button className='consult_check_btn' id='consult_check_btn_yes' onClick={() => handleAccept(app.id)}>수락</button>
                    <button className='consult_check_btn' id='consult_check_btn_no' onClick={() => handleReject(app.id)}>거절</button>
                  </>
                )}
                {app.status === "확정" && (
                  <>
                    <a href={app.zoomLink} target="_blank" rel="noopener noreferrer">Zoom 링크</a>
                    <button className='consult_check_btn' id='consult_check_btn_complete' onClick={() => handleComplete(app.id)}>완료</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Vet_consult;