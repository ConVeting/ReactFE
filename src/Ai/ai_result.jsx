import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ai_result.css';
import nonImage from "../Image/Non_Image.png";

export default function ResultPage() {
  const location = useLocation();
  const { id, dogId, type, image, disease1, symptom1, cure1, prob1, disease2, symptom2, cure2, prob2 } = location.state || {}; // 결과 ID와 강아지 ID를 받아옴

  // 정적인 검사 일시를 상태로 저장 (날짜, 시간, 분까지 표시)
  const [staticTimestamp] = useState(new Date().toLocaleString([], {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }));

  const topTwoDiseases = [
    { name: disease1, probability: Math.floor(prob1), symptoms: symptom1, treatment: cure1 },
    { name: disease2, probability: Math.floor(prob2), symptoms: symptom2, treatment: cure2 }
  ];

  return (
    <div className="result-page">
      {/* 결과 정보 */}
      <div className="result-info">
        <p>검사 일시: {staticTimestamp}</p> {/* 날짜, 시간, 분까지 표시 */}
      </div>

      {/* 진단 결과 */}
      <div className="result-diagnosis">
        <h2>진단 결과</h2>
        {topTwoDiseases.length === 0 ? (
          <p>정상입니다.</p>
        ) : (
          <>
            <div className="result-image">
              <img src={image || nonImage} alt={`${type} 이미지`} />
            </div>

            <p>상위 두 가지 질환:</p>
            <ul>
              {topTwoDiseases.map((disease, index) => (
                <li key={index}>
                  <h3>{disease.name} {disease.probability}%</h3>
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
