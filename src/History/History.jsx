import React, { useState, useEffect, useCallback } from 'react';
import { useUser } from '../User_Context';
import { Trash } from 'lucide-react';
import './History.css';

//AI 진단 기록
const ResultCard = ({ result, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleDelete = () => {
    if (window.confirm('정말로 이 검사 결과를 삭제하시겠습니까?')) {
      onDelete(result.id);
    }
  };

  return (
    <div className="result-card">
      <div className="result-header">
        <h2>{result.dogName}의 {result.type === 'eye' ? '안구' : '피부'} 검사</h2>
        <button onClick={handleDelete} className="delete-button"><Trash size={18} /></button>
      </div>
      <p>검사 일시: {new Date(result.timestamp).toLocaleDateString()}</p>
      <img src={result.image} alt={`${result.dogName}의 ${result.type} 검사`} className="result-image-history" />
      <button onClick={toggleDetails} className="detail-button">
        {showDetails ? '상세 결과 닫기' : '상세 결과 보기'}
      </button>
      {showDetails && (
        <div className="result-details">
          <h3>진단 결과</h3>
          {result.result.isNormal ? (
            <p>정상입니다.</p>
          ) : (
            <>
              <p>상위 두 가지 질환:</p>
              <ul>
                {result.result.diseases.slice(0, 3).map((disease, index) => (
                  <li key={index}>
                    <h4>{disease.name} ({disease.probability}%)</h4>
                    <p>주요 증상: {disease.symptoms}</p>
                    <p>대처법: {disease.treatment}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const ResultsPage = () => {
  const { user, updateUser } = useUser();
  const [selectedDog, setSelectedDog] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [filteredResults, setFilteredResults] = useState([]);

  const filterResults = useCallback(() => {

    if (!user || !user.dogs) {
      setFilteredResults([]);
      return;
    }

    let results = [];



    user.dogs.forEach(dog => {
      if (dog.results) {
        dog.results.forEach(result => {
          results.push({ ...result, dogName: dog.name, dogId: dog.id });
        });
      }
    });

    if (selectedDog !== 'all') {
      results = results.filter(result => result.dogId === selectedDog);
    }

    if (selectedType !== 'all') {
      results = results.filter(result => result.type === selectedType);
    }

    setFilteredResults(results);
  }, [user, selectedDog, selectedType]);


  useEffect(() => {
    if (user) {
      filterResults();
    }
  }, [user, selectedDog, selectedType, filterResults]);  // 여기에 filterResults 추가


  const handleDeleteResult = (resultId) => {
    if (!user || !user.dogs) return;

    const updatedDogs = user.dogs.map(dog => ({
      ...dog,
      results: dog.results ? dog.results.filter(result => result.id !== resultId) : []
    }));

    const updatedUser = { ...user, dogs: updatedDogs };
    updateUser(updatedUser);
    filterResults();
  };

  if (!user) {
    return <div>로그인이 필요합니다.</div>;
  }

  if (!user.dogs || user.dogs.length === 0) {
    return <div>등록된 강아지가 없습니다.</div>;
  }

  return (
    <div className="results-page">
      <h1>검사 결과 조회</h1>
      <div className="filter-container">
        <select
          value={selectedDog}
          onChange={(e) => setSelectedDog(e.target.value)}
          className="filter-select"
        >
          <option value="all">전체 강아지</option>
          {user.dogs.map(dog => (
            <option key={dog.id} value={dog.id}>{dog.name}</option>
          ))}
        </select>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="filter-select"
        >
          <option value="all">전체 검사</option>
          <option value="eye">안구</option>
          <option value="skin">피부</option>
        </select>
      </div>
      <div className="results-grid">
        {filteredResults.length > 0 ? (
          filteredResults.map(result => (
            <ResultCard key={result.id} result={result} onDelete={handleDeleteResult} />
          ))
        ) : (
          <div className="no-results-message">
            <p>선택한 조건에 맞는 진단 결과가 없습니다.</p>
            <p>다른 필터 옵션을 선택해 보세요.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;