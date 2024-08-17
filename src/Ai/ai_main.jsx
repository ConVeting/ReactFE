import React, { useRef, useState, useEffect } from 'react';
import { useNavigationHandlers } from '../Navigate';
import axios from 'axios';
import { useUser } from '../User_Context';
import "./ai_main.css";
//이미지 업로드 이전 기본 이미지
import nonImage from "../Image/Non_Image.png";

// 질병 더미 데이터 생성 함수, 실제로는 ai 진단 결과가 될 예정
const generateDummyData = (dog, type) => {
  const isNormal = Math.random() > 0.8;
  const diseases = [
    {
      name: "피부염",
      probability: Math.floor(Math.random() * 50) + 50,
      symptoms: "가려움, 붉은 반점, 탈모",
      treatment: "항생제 처방, 특수 샴푸 사용"
    },
    {
      name: "알레르기",
      probability: Math.floor(Math.random() * 40) + 30,
      symptoms: "재채기, 눈물, 피부 발진",
      treatment: "알레르겐 회피, 항히스타민제 투여"
    },
    // {
    //   name: "농포 여드름",
    //   probability: Math.floor(Math.random() * 40) + 30,
    //   symptoms: "가려움증, 이차적인 세균 감염",
    //   treatment: "항균 용액으로 청소, 국소 혹은 경구 항생제 사용"
    // },
    // {
    //   name: "미란/궤양",
    //   probability: Math.floor(Math.random() * 40) + 30,
    //   symptoms: "통증을 유발, 붉고 염증이 있으며 감염의 위험이 있다.",
    //   treatment: "보호 연고 사용하고 항생제 사용"
    // }
    {
      name: "결막염",
      probability: Math.floor(Math.random() * 30) + 20,
      symptoms: "눈 충혈, 눈곱 증가",
      treatment: "안약 처방, 따뜻한 압박"
    },
    // {
    //   name: "결막염2",
    //   probability: Math.floor(Math.random() * 30) + 20,
    //   symptoms: "눈 충혈, 눈곱 초증가",
    //   treatment: "안약 처방, 따뜻한 압박"
    // },
    // {
    //   name: "결막염3",
    //   probability: Math.floor(Math.random() * 30) + 20,
    //   symptoms: "눈 충혈, 눈곱 울츠라증가",
    //   treatment: "안약 처방, 따뜻한 초초 압박"
    // },
    {
      name: "안검내반증",
      probability: Math.floor(Math.random() * 30) + 20,
      symptoms: "눈꺼풀이 말려들어가 문지르게 되어 궤양 유발",
      treatment: "수술을 통해 눈꺼풀 위치 교정, 윤활제 역할을 하는 안약"
    }
  ];

  return {
    isNormal,
    diseases: isNormal ? [] : diseases.sort(() => Math.random() - 0.5).slice(0, 3)
  };
};

export default function Ai_main() {
  //페이지 이동
  const { move_ai_result } = useNavigationHandlers();
  //이미지, 선택한 강아지, 선택한 진단 타입 설정
  const [imgFile, setImgFile] = useState("");
  const [selectedDog, setSelectedDog] = useState("");
  const [selectedType, setSelectedType] = useState("");
  //메세지 설정
  const [message, setMessage] = useState("");

  const imgRef = useRef(null);
  const { user, updateUser } = useUser();

  useEffect(() => {
    if (user && user.dogs && user.dogs.length > 0) {
      setSelectedDog(user.dogs[0].id);
    }
  }, [user]);

  //이미지 업로드 input의 onChange
  const saveImgFile = () => {
    if (imgRef.current.files.length === 0) return; //선택된 파일 없으면 종료
    const file = imgRef.current.files[0]; //첫 번째 파일 가져옴
    const reader = new FileReader(); 
    reader.readAsDataURL(file); //파일 DataURL 형식으로 읽기 시작 -> 이미지 파일을 Base64로 인코딩하여 문자열로 변환
    reader.onloadend = () => { //읽기 완료 후 실행될 함수
      setImgFile(reader.result); //결과 상태에 저장
    };
  };

  //이미지 사진 제출 버튼
  const handleSubmit = async (e) => {
    e.preventDefault();
    //모든 항목 선택 후 업로드 가능
    if (!selectedDog || !selectedType || !imgFile) {
      setMessage("모든 항목을 선택하고 이미지를 업로드해주세요.");
      return;
    }

    try {
      // 더미 데이터 생성
      const dummyResult = generateDummyData(selectedDog, selectedType);
      
      // 선택된 강아지 찾기
      const dogIndex = user.dogs.findIndex(dog => dog.id === selectedDog);
      if (dogIndex === -1) {
        setMessage("선택된 강아지를 찾을 수 없습니다.");
        return;
      }

      // 새로운 결과 객체 생성
      const newResult = {
        id: Date.now().toString(),
        type: selectedType,
        image: imgFile,
        result: dummyResult,
        timestamp: new Date().toISOString()
      };

      // 사용자 정보 업데이트
      const updatedUser = { ...user };
      if (!updatedUser.dogs[dogIndex].results) {
        updatedUser.dogs[dogIndex].results = [];
      }
      updatedUser.dogs[dogIndex].results.push(newResult);

      // 서버에 업데이트된 사용자 정보 저장
      const response = await axios.put(`http://localhost:3001/users/${user.id}`, updatedUser);
      
      console.log('분석 요청 성공:', response.data);
      setMessage("분석 요청이 성공적으로 전송되었습니다!");

      // 사용자 정보 업데이트
      updateUser(updatedUser);

      // 결과 데이터를 포함하여 결과 페이지로 이동
      move_ai_result({
        id: newResult.id,
        dogId: selectedDog
      });
    } catch (error) {
      console.error('분석 요청 실패:', error);
      setMessage("분석 요청 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (     
    <div className='frame'>
      <div className='main_title'>AI Health Check</div>
      <form className='form_Ai_image_upload' onSubmit={handleSubmit}>
        <div className='select-container'>
          <select 
            value={selectedDog} 
            onChange={(e) => setSelectedDog(e.target.value)}
            className='select-dog'
          >
            <option value="">강아지 선택</option>
            {user && user.dogs && user.dogs.map(dog => (
              <option key={dog.id} value={dog.id}>{dog.name}</option>
            ))}
          </select>
          <select 
            value={selectedType} 
            onChange={(e) => setSelectedType(e.target.value)}
            className='select-type'
          >
            <option value="">분석 유형</option>
            <option value="skin">피부</option>
            <option value="eye">안구</option>
          </select>
        </div>
        <div className='Ai_image_pre_container'>
          {/* 업로드 된 이미지 미리보기 */}
          <img className='Ai_image_pre'
            src={imgFile || nonImage}
            alt="업로드된 이미지 미리보기"
          />
        </div>
        {/* 이미지 업로드 input */}
        {/* htmlFor을 이용해서 일치하는 id와 기능 연결 */}
        <label className='Ai_image_upload_label' htmlFor='Ai_image'>피부/안구 사진 업로드</label>
        <input
          className='Ai_image_upload_input'
          type='file'
          accept='.png, .jpg'
          id='Ai_image'
          onChange={saveImgFile}
          ref={imgRef}
        />
        <button type="submit" className='submit-button'>분석 요청</button>
      </form>
      {message && <p className='message'>{message}</p>}
    </div>
  );
}