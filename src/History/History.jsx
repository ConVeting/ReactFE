import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash } from 'lucide-react';
import './History.css';

//검사 결과 펼쳤을 때의 결과
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
        <h2>{result.pet}의 {result.part === 'eye' ? '안구' : '피부'} 검사</h2>
        <button onClick={handleDelete} className="delete-button"><Trash size={18} /></button>
      </div>
      <img src={result.photo} alt={`${result.pet}의 ${result.part} 검사`} className="result-image-history" />
      <button onClick={toggleDetails} className="detail-button">
        {showDetails ? '상세 결과 닫기' : '상세 결과 보기'}
      </button>
      {showDetails && (
        <div className="result-details">
          <h3>진단 결과</h3>
          <h4>{result.disease}</h4>
          {result.symptom && <p>주요 증상: {result.symptom}</p>}
          {result.cure && <p>대처법: {result.cure}</p>}
        </div>
      )}
    </div>
  );
};

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [selectedDog, setSelectedDog] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:8000/diagnosis/history/', {
          params: { user_id: 'testuser' }
        });
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, []);

  useEffect(() => {
    let filtered = results;

    if (selectedDog !== 'all') {
      filtered = filtered.filter(result => result.pet === selectedDog);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(result => result.part === selectedType);
    }

    setFilteredResults(filtered);
  }, [results, selectedDog, selectedType]);

  const handleDeleteResult = (resultId) => {
    // 실제 삭제 로직은 백엔드와 연동해야 합니다.
    // 여기서는 프론트엔드에서만 삭제하는 것으로 가정합니다.
    const updatedResults = results.filter(result => result.id !== resultId);
    setResults(updatedResults);
  };

  const dogs = [...new Set(results.map(result => result.pet))];

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
          {dogs.map(dog => (
            <option key={dog} value={dog}>{dog}</option>
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
          filteredResults.map((result, index) => (
            <ResultCard key={index} result={result} onDelete={handleDeleteResult} />
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