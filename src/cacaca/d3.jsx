import React from 'react';

const DogSelector = ({ dogs, selectedDog, onSelect }) => {
  return (
    <select 
      value={selectedDog || ''} 
      onChange={(e) => onSelect(e.target.value)}
      className='select-dog'
    >
      <option value="">강아지 선택</option>
      {dogs.map(dog => (
        <option key={dog.id} value={dog.id}>{dog.name}</option>
      ))}
    </select>
  );
};

export default DogSelector;