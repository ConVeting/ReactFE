import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../User_Context'; // UserContext에서 useUser 훅을 가져옵니다.
import { useNavigate } from 'react-router-dom'; // 로그인 후 페이지 이동을 위해 사용합니다.
import { InputField_id_login, InputField_pwd_login } from '../Jiwon_compo/Form_compo/login_input';
import { Button_submit, Button_Signup } from '../Jiwon_compo/Form_compo/button_submit';
import './Login_Signup.css'
import Logo from '../Image/Logo.png'

const LoginForm = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login } = useUser(); // UserContext에서 login 함수를 가져옵니다.
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3001/users?id=${id}&password=${password}`);
      if (response.data.length > 0) {
        const user = response.data[0];
        login(user); // UserContext의 login 함수를 사용하여 전역 상태를 업데이트합니다.
        navigate('/Home'); // 로그인 성공 후 홈 페이지로 이동합니다.
      } else {
        setMessage('아이디 또는 비밀번호가 잘못되었습니다.');
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      setMessage('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className='contents_padding'>
      <form className="form_login_signup" onSubmit={handleSubmit}>
        <div className='title' style={{textAlign:'center'}} >
          <img src={Logo} alt="컨벳팅" 
            style={{
              maxWidth: '300px', 
              width: '60%',
              height: 'auto',
              cursor: 'pointer',
            }} 
          />
          <div>Log In</div>
        </div>
        <InputField_id_login
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <InputField_pwd_login
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button_submit text="로그인"/>
        <Button_Signup/>
      </form>
      {message && <p className='center_text'>{message}</p>}
    </div>
  );
};

export default LoginForm;
