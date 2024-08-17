import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../User_Context';
import './ai_result.css';

export default function ResultPage() {
  const location = useLocation();
  const { id, dogId } = location.state || {}; // 결과 ID와 강아지 ID를 받아옴
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchResult = async () => {
      if (!user || !dogId) {
        setLoading(false);
        return;
      }

      try {
        const dog = user.dogs.find(d => d.id === dogId);
        if (!dog) {
          console.error('강아지를 찾을 수 없습니다.');
          setLoading(false);
          return;
        }

        const foundResult = dog.results.find(r => r.id === id);
        if (foundResult) {
          setResult(foundResult);
        } else {
          console.error('결과를 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('결과 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [user, id, dogId]);

  // 로딩 페이지 추후 디테일 구현 필요
  if (loading) {
    return <div>결과를 불러오는 중...</div>;
  }

  if (!result) {
    return <div>결과를 찾을 수 없습니다.</div>;
  }

  const { type, image, timestamp, result: analysisResult } = result;
  const dog = user.dogs.find(d => d.id === dogId);
  const topTwoDiseases = analysisResult.diseases;

  // type에 따른 한국어 변환
  const typeTranslations = {
    eye: '안구',
    skin: '피부',
  };
  const type_kr = typeTranslations[type] || type; // 기본값으로 type 사용

  return (
    <div className="result-page">
      <div className='main_title'>{dog ? dog.name : '알 수 없는 강아지'}의 {type_kr} 건강 체크 결과</div>
      <div className="result-image">
        <img src={image} alt={`${dog ? dog.name : '강아지'}의 ${type}`} />
      </div>
      <div className="result-info">
        <p>검사 일시: {new Date(timestamp).toLocaleString()}</p>
        <p>강아지: {dog ? dog.name : '알 수 없음'}</p>
        <p>견종: {dog ? dog.breed : '알 수 없음'}</p>
        <p>나이: {dog ? dog.age : '알 수 없음'}</p>
        <p>검사 유형: {type_kr}</p>
      </div>
      <div className="result-diagnosis">
        <h2>진단 결과</h2>
        {analysisResult.isNormal ? (
          <p>정상입니다.</p>
        ) : (
          <>
            <p>상위 세 가지 질환:</p>
            <ul>
              {topTwoDiseases.map((disease, index) => (
                <li key={index}>
                  <h3>{disease.name} ({disease.probability}%)</h3>
                  <p>주요 증상: {disease.symptoms}</p>
                  <p>대처법: {disease.treatment}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}