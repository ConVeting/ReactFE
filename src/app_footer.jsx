import React from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
//아이콘 라이브러리
import { Camera, Heart, Home, Clock, User } from 'lucide-react';
import "./App.css";
import "./app_footer.css";
import { useNavigationHandlers } from './Navigate';

//앱 푸터
const NavItem = ({ icon, label, onClick, isActive = false }) => (
    //active 상태면 icon_wrapper 생김
    <button onClick={onClick} className={`nav_item ${isActive ? 'active' : ''}`}>
        <div className="icon_wrapper">
        {React.cloneElement(icon, { size: 24 })}
        </div>
        <span>{label}</span>
    </button>
);

export default function App_footer({ activeRoute }){
    const {  move_ai_main, move_home, move_history, move_mypage, move_community } = useNavigationHandlers();
    return (
        <div className='footer_padding'>
            <div className='footer'>
                <NavItem 
                    icon={<Camera />} 
                    label="AI Check" 
                    onClick={move_ai_main} 
                    isActive={activeRoute.startsWith('/Ai')} 
                />
                <NavItem 
                    icon={<Heart />} 
                    label="Community" 
                    onClick={move_community} 
                    isActive={activeRoute.startsWith('/Blog')} 
                />
                <NavItem 
                    icon={<Home />} 
                    label="Home" 
                    onClick={move_home} 
                    isActive={activeRoute.startsWith('/Home')} 
                />
                <NavItem 
                    icon={<Clock />} 
                    label="History" 
                    onClick={move_history} 
                    isActive={activeRoute.startsWith('/History')} 
                />
                <NavItem 
                    icon={<User />} 
                    label="My Page" 
                    onClick={move_mypage} 
                    isActive={activeRoute.startsWith('/Info')} 
                />
            </div>   
        </div>
    );
    
}

  