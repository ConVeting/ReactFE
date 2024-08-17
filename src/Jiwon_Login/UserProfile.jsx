import React from 'react';
import { useUser } from '../User_Context';

function UserProfile() {
  const { user, logout } = useUser();

  if (!user) return null;

  return (
    <div>
      <h2>사용자 프로필</h2>
      <p>아이디: {user.id}</p>
      <p>이름: {user.name_user}</p>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
}

export default UserProfile;
