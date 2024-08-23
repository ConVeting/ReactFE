import React from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import "./App.css";
import "./app_header.css"
import { useUser } from '../User_Context';
import Logo from './Image/Logo.png'
import { Button_Loginstate } from '../Component/Form_compo/button_submit';
import { useNavigationHandlers } from '../Navigate';

//앱 헤더
export default function App_header(){
  const { move_home } = useNavigationHandlers();

  return (
    <div className='header_padding'>
      <div className='header'>
        <img src={Logo} alt="컨벳팅" 
          style={{
            maxWidth: '100px', 
            width: '25%',
            height: 'auto', // 비율 유지
            cursor: 'pointer'
          }} 
          onClick={move_home}
        />
        <Button_Loginstate/>
      </div>
    </div>
  );
}
  