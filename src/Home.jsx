import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./App.css";
import"./flex.css";
import Carousel from './Component/Carousel/carousel';
import { useNavigationHandlers } from './Navigate';

//로그인 한번에 관리
import { useUser } from './User_Context';
//달력 임시 이미지
import before from './Image/before_login_ca.png'
import after from './Image/after_login_ca.png'


export default function Home() {
  const { move_consult, move_ai_main, move_community } = useNavigationHandlers();

  const { user, login, logout } = useUser();

  return (     
    <div className='frame'>
      <div className='container'>
        <div className='item_long'>
          <button className='btn_move_section non_meet_consertbtn_img' onClick={move_consult}> 비대면 수의사 상담 </button>
        </div>
        <div className='item'>
          <button className='btn_move_section ai_healthcheckbtn_img' onClick={move_ai_main}> AI 건강 체크 </button>
        </div>
        <div className='item'>
          <button className='btn_move_section communitybtn_img' onClick={move_community}> 커뮤니티 </button>
        </div>
        <div className='item_long'>
          <Carousel/>
        </div>
        <div className='item_long'>
          {user ? (
            <img className="cal_img" src={after}/>
          ) : (
            <img className="cal_img" src={before}/>
          )}
        </div>
      </div>
    </div>
  );
}



        