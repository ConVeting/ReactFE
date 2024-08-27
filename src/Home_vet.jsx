import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./App.css";
import"./flex.css";
import Carousel from './Component/Carousel/carousel';
import { useNavigationHandlers } from './Navigate';

//로그인 한번에 관리
import { useUser } from './User_Context';



export default function Home_vet() {
  const { move_consult, move_ai_main, move_community } = useNavigationHandlers();

  const { user, login, logout } = useUser();

  return (     
    <div className='frame'>
      <div className='container'>
        <div className='item_long'>
          <button className='btn_move_section non_meet_consertbtn_img' onClick={move_consult}> 아무글씨나 </button>
        </div>
        <div className='item'>
          <button className='btn_move_section ai_healthcheckbtn_img' onClick={move_ai_main}> 일단 적어두자꾸나 </button>
        </div>
        <div className='item'>
          <button className='btn_move_section communitybtn_img' onClick={move_community}> 커뮤니티 </button>
        </div>
        <div className='item_long'>
          <Carousel/>
        </div>
        <div className='item_long'>

        </div>
      </div>
    </div>
  );
}



        