import React, {useState} from 'react';
import './button_submit.css'
import { useNavigationHandlers } from '../../Navigate';
import { useUser } from '../../User_Context'; 

import { ChevronDown, Plus, LogOut, User, Dog } from 'lucide-react';

// 제출 버튼
const Button_submit = ({text}) => {
  return (
    <button className="btn_login_submit" type="submit">{text}</button>
  );
};

//로그인으로 이동하는 버튼
const Button_Login = () => {
  const {  move_login } = useNavigationHandlers();
  return (
    <button className="btn_login" onClick={move_login}>Login</button>
  )
}

//회원가입으로 이동하는 버튼
const Button_Signup = () => {
  const { move_signup  } = useNavigationHandlers();
  return (
    <button className="btn_login" onClick={move_signup}>Sign Up</button>
  )
}

//로그아웃하고 home으로 이동하는 버튼
const Button_Logout = () => {
  const { user, logout } = useUser();
  const {  move_home  } = useNavigationHandlers();
    //동시에 호출하기 위함
  function handleLogoutAndMoveHome() {
    logout(); // 로그아웃 함수 호출
    move_home(); // 홈으로 이동하는 함수 호출
  }
  return (
    <button className="btn_login" onClick={handleLogoutAndMoveHome }>Logout</button>
  )
}

const Button_Loginstate = () => {
  const { user, updateUser } = useUser();
  const { move_mypage, move_plusdog } = useNavigationHandlers();
  const [selectedDog, setSelectedDog] = useState('');
  //강아지 정렬 창 여닫이
  const [isOpen, setIsOpen] = useState(false);

  const handleDogChange = (dogId) => {
    setSelectedDog(dogId);
    //선택된 강아지 정보를 전역 상태에 저장
    updateUser({ ...user, selectedDog: dogId });
    setIsOpen(false);
  };

  //반려견 추가 페이지로 이동
  const handleAddDog = () => {
    move_plusdog();
    setIsOpen(false);
  };

  return(
    <div className="header_profile">
      {user ? (
        <>
          <div className="header_profile_username" onClick={move_mypage}>
             <User size={18} /> 
            {user.name_user} 
          </div>
          {/* 강아지 선택 */}
          <div className="custom_select">
            <button className="select_button" onClick={() => setIsOpen(!isOpen)}>
              {selectedDog ? user.dogs.find(dog => dog.id === selectedDog)?.name : <Dog size={18} />}
              {/* <Dog size={18} /> */}
            </button>
            {isOpen && (
              <div className="select_dropdown">
                {user.dogs && user.dogs.map((dog) => (
                  <div key={dog.id} className="select_item" onClick={() => handleDogChange(dog.id)}>
                    {dog.name}
                  </div>
                ))}
                <div className="select_item add_dog" onClick={handleAddDog}>
                  <Plus size={18} /> {/*추가 아이콘 */}
                  
                </div>
              </div>
            )}
          </div>
          <Button_Logout />
        </>
      ) : (
        <Button_Login />
      )}
    </div>
  )
}
export { Button_submit, Button_Login, Button_Signup, Button_Logout, Button_Loginstate };
