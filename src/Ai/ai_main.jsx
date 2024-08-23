//AI 진단 페이지
import React, { useRef, useState, useEffect } from 'react';
import { useNavigationHandlers } from '../Navigate';
import axios from 'axios';
import { useUser } from '../User_Context';
import "./ai_main.css";
//이미지 업로드 이전 기본 이미지
import nonImage from "../Image/Non_Image.png";

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

    // 모든 항목 선택 후 업로드 가능
    if (!selectedDog || !selectedType || !imgFile) {
      setMessage("모든 항목을 선택하고 이미지를 업로드해주세요.");
      return;
    }

    try {
      // FormData 객체 생성
      const formData = new FormData();
      formData.append('owner', 'testuser');
      formData.append('pet', selectedDog);  // 선택된 강아지 ID
      formData.append('part', selectedType);  // 선택된 분석 유형
      formData.append('photo', imgRef.current.files[0]);  // 업로드된 이미지 파일

      // 서버에 POST 요청 보내기
      const response = await axios.post('http://localhost:8000/diagnosis/description/', formData);

      console.log('분석 요청 성공:', response.data);
      setMessage("분석 요청이 성공적으로 전송되었습니다!");

      // 사용자 정보 업데이트 (더미 데이터)
      const dummyResult = generateDummyData(selectedDog, selectedType);
      // const dogIndex = user.dogs.findIndex(dog => dog.id === selectedDog);
      const newResult = {
        id: Date.now().toString(),
        type: selectedType,
        image: imgFile,  // Ensure this is the correct Base64 string
        result: dummyResult,
        timestamp: new Date().toISOString()
      };

      // 결과 페이지로 이동
      move_ai_result({
        id: newResult.id,
        // dogId: selectedDog,
        image: imgFile,
        type: selectedType,
        disease1: response.data.diagnoses[0].disease,
        symptom1: response.data.diagnoses[0].symptom,
        cure1: response.data.diagnoses[0].cure,
        prob1: response.data.diagnoses[0].probability,
        disease2: response.data.diagnoses[1].disease,
        symptom2: response.data.diagnoses[1].symptom,
        cure2: response.data.diagnoses[1].cure,
        prob2: response.data.diagnoses[1].probability,
      });
    } catch (error) {
      setMessage("분석 요청 중 오류가 발생했습니다. 다시 시도해주세요.");
      console.error('분석 요청 실패:', error);
    }
  };


  return (
    <div className='frame'>
      <div className='main_title'>AI Health Check</div>
      <form className='form_Ai_image_upload' onSubmit={handleSubmit}>
        <div className='select-container'>
          {/* 선택한 강아지를 setSelectedDog로 */}
          <select
            value={selectedDog}
            onChange={(e) => setSelectedDog(e.target.value)}
            className='select-dog'
          >
            <option value="">강아지 선택</option>
            <option value="FEdog">개</option>
            {/* 유저의 강아지 목록 다 가져오기 */}
            {user && user.dogs && user.dogs.map(dog => (
              <option key={dog.id} value={dog.id}>{dog.name}</option>
            ))}
          </select>
          {/* 선택한 분석 유형을 setSelectedType로 */}
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
          accept='.png, .jpg, .jpeg'
          id='Ai_image'
          onChange={saveImgFile}
          ref={imgRef}
        />
        {/* 분석요청(제출) 버튼 */}
        <button type="submit" className='submit-button'>분석 요청</button>
      </form>
      {message && <p className='message'>{message}</p>}
    </div>
  );
}