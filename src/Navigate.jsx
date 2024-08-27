//주소 이동
import React from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';

export function useNavigationHandlers() {
    // 나비게이트 간결화
    const navigate = useNavigate();

    //footer 링크들
    const move_ai_main = () => navigate('/Ai/ai_main');
    const move_ai_result = (resultData) => navigate('/Ai/ai_result', { state: resultData });
    const move_home = () => navigate('/Home');
    const move_mypage = () => navigate('/Info/mypage');
    const move_history = () => navigate('/History');

    //커뮤니티 
    const move_community = () => navigate('/Blog/postlist');

    //수의사 상담
    const move_consult = () => navigate('/Talk/vet_list');

    //로그인, 회원가입
    const move_login = () => navigate('/Login/login');
    const move_signup = () => navigate('/Login/signup');

    const move_plusdog = () => navigate('/Register/plusdog');


    //수의사
    //홈
    const move_home_vet = () => navigate('/Home_vet');
    //상담
    const move_consult_vet = () => navigate('/Talk/vet_consult');
    return { move_ai_main, move_ai_result, move_home, move_mypage, move_history, 
        move_community, move_consult,
        move_login, move_signup, move_plusdog,
        
        move_home_vet,move_consult_vet
    };
}
