import React, { useState } from 'react';
import './vet.css';

function Vet_zoom() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [zoomLink, setZoomLink] = useState('');

  const handleGenerateLink = () => {
    // 임의의 Zoom 링크 생성
    const generatedLink = `https://zoom.us/j/${Math.floor(1000000000 + Math.random() * 9000000000)}?pwd=${Math.random().toString(36).substr(2, 10)}`;
    setZoomLink(generatedLink);
  };

  const move_vet_list = () => window.location.href = '../Talk/vet_list'

  return (
    <div className="zoom-setup-container">
      <h2>Zoom 회의 신청</h2>
      <div className="form-group">
        <label>날짜</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>시간</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <button className='button_zoom' onClick={handleGenerateLink}>Zoom 링크 생성  </button>

      {zoomLink && (
        <div className="zoom-link">
          <h3>생성된 Zoom 링크:</h3>
          <a href={zoomLink} target="_blank" rel="noopener noreferrer">{zoomLink}</a>
          <p>날짜: {date}</p>
          <p>시간: {time}</p>
        </div>
      )}
     <button className='button_zoom' onClick={move_vet_list}> 돌아가기 </button>

    </div>
  );
}

export default Vet_zoom;
