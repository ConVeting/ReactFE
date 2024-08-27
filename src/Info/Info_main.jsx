import React, { useState, useEffect } from 'react';
import { useUser } from '../User_Context';
import './Mypage.css';
import Logo from '../Image/Logo.png'

const UserInfoSection = ({ user }) => (
  <div className="user-info-section">
    <h2>회원 정보</h2>
    <p><strong>아이디:</strong> {user.id}</p>
    <p><strong>닉네임:</strong> {user.name_user}</p>
  </div>
);

const DogInfoSection = ({ dogs }) => {
  if (!dogs || dogs.length === 0) {
    return (
      <div className="dog-info-section">
        <h2>반려견 정보</h2>
        <p>등록된 반려견 정보가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="dog-info-section">
      <h2>반려견 정보</h2>
      {dogs.map((dog, index) => (
        <div key={index} className="dog-info">
          <h3>{dog.name}</h3>
          <p><strong>품종:</strong> {dog.breed}</p>
          <p><strong>나이:</strong> {dog.age}세</p>
          <p><strong>무게:</strong> {dog.weight}kg</p>
          <p><strong>성별:</strong> {dog.gender === 'male' ? '수컷' : '암컷'}</p>
          <p><strong>중성화 여부:</strong> {dog.isNeutered ? '완료' : '미완료'}</p>
          <p><strong>알러지:</strong> {dog.allergies || '없음'}</p>
        </div>
      ))}
    </div>
  );
};

const VetInfoSection = ({ appointments }) => {
  const totalConsultations = appointments.length;
  const acceptedConsultations = appointments.filter(app => app.status === "완료").length;
  const currentMonth = new Date().getMonth() + 1;
  const monthlyConsultations = appointments.filter(app => {
    const appointmentMonth = new Date(app.date).getMonth() + 1;
    return appointmentMonth === currentMonth && (app.status === "완료" || app.status === "확정");
  }).length;

  return (
    <div className="vet-info-section">
      <h2>활동 정보</h2>
      <p><strong>받은 총 상담신청 횟수:</strong> {totalConsultations}건</p>
      <p><strong>수락한 상담 건수:</strong> {acceptedConsultations}건</p>
      <p><strong>이번달 상담 횟수:</strong> {monthlyConsultations}건</p>
    </div>
  );
};

const MyPage = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('user');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // 예시 데이터
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

  if (!user) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <div className="my-page">
      <div style={{textAlign:'center'}} >
        <img src={Logo} alt="컨벳팅" 
          style={{
            maxWidth: '300px', 
            width: '60%',
            height: 'auto',
            cursor: 'pointer',
          }} 
        />
        <div>My Page</div>
      </div>
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'user' ? 'active' : ''}`}
          onClick={() => setActiveTab('user')}
        >
          회원 정보
        </button>
        <button
          className={`tab ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          {user.userType === 'vet' ? '활동 정보' : '반려견 정보'}
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'user' ? (
          <UserInfoSection user={user} />
        ) : (
          user.userType === 'vet' ? (
            <VetInfoSection appointments={appointments} />
          ) : (
            <DogInfoSection dogs={user.dogs} />
          )
        )}
      </div>
    </div>
  );
};

export default MyPage;
