import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import "./App.css";
import { UserProvider } from './User_Context';

//앱 헤더 푸터
import App_header from './Head_and_Foot/app_header.jsx'
import App_footer from './Head_and_Foot/app_footer.jsx'

//로그인 회원가입
import LoginForm from './Login/Login_test.jsx';
import SignUpForm from './Login/Sign_up.jsx';
//강아지 등록(추가)
import DogRegistrationForm from './Login/DogRegistrationForm.jsx';

//푸터 항목
//1. 홈
import Home from './Home.jsx';
//2. ai진단
import Ai_main from './Ai/ai_main.jsx';
import ResultPage from './Ai/ai_result.jsx';
//3. 기록
import History from './History/History.jsx';
//++ 수의사 상담
import Vet_list from './Talk/vet_list.jsx';
import Vet_zoom from './Talk/vet_zoom.jsx';
import Vet_talk from './Talk/vet_talk.jsx';
import Vet_history from './Talk/vet_history.jsx';
//4.커뮤니티
import PostForm from './Blog/postform.jsx';
import PostList from './Blog/postlist.jsx';
import Postdetail from './Blog/postdetail.jsx';
//5.마이페이지
import MyPage from './Info/Info_main.jsx';

// 수의사 회원 
import Home_vet from './Home_vet.jsx';

//로케이션 훅은 함수에만 가능해서 함수로 변경
const App = () => {

  const location = useLocation(); // 현재 경로를 가져오기
  // 현재 경로에 따라 활성화 상태 설정
  const activeRoute = location.pathname;

  return (
    <UserProvider>
      <div className='frame1'>
        <App_header />
        <Routes>
          {/* 일반 회원 */}
          {/* 로그인 회원가입 */}
          <Route path='/Login/login' element={<LoginForm />} />
          <Route path='/Login/signup' element={<SignUpForm />} />
          {/* 강아지 등록(추가) */}
          <Route path='/Register/plusdog' element={<DogRegistrationForm />} />

          {/* 푸터 항목 */}
          {/* 1. 홈 */}
          <Route path='/Home' element={<Home />} />
          {/* 2. AI 진단 */}
          <Route path='/Ai/ai_main' element={<Ai_main />} />
          <Route path='/Ai/ai_result' element={<ResultPage />} />
          {/* ++ 수의사 상담 */}
          <Route path='/Talk/vet_list' element={<Vet_list />} />
          <Route path='/Talk/vet_talk/:id' element={<Vet_talk />} />
          <Route path='/Talk/vet_zoom' element={<Vet_zoom />} />
          <Route path='/Talk/vet_history' element={<Vet_history />} />
          {/* 3. 기록 */}
          <Route path='/History' element={<History />} />
          {/* 4. 커뮤니티 */}
          <Route path='/Blog/postform' element={<PostForm />} />
          <Route path='/Blog/postlist' element={<PostList />} />
          <Route path='/Blog/:id' element={<Postdetail />} />
          {/* 5. 마이페이지 */}
          <Route path='/Info/mypage' element={<MyPage />} />
          
          {/* 수의사 회원 */}
          {/* 로그인 회원가입 */}
          <Route path='/Home_vet' element={<Home_vet />} />


        </Routes>
        <App_footer activeRoute={activeRoute} /> {/* 현재 경로를 App_footer에 전달 */}
      </div>
    </UserProvider>
  );

}
export default App;
