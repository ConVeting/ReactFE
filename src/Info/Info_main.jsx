import React, { useState } from 'react';
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

const MyPage = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('user');

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
          className={`tab ${activeTab === 'dogs' ? 'active' : ''}`}
          onClick={() => setActiveTab('dogs')}
        >
          반려견 정보
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'user' ? (
          <UserInfoSection user={user} />
        ) : (
          <DogInfoSection dogs={user.dogs} />
        )}
      </div>
    </div>
  );
};

export default MyPage;