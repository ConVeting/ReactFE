import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../User_Context';
import { useNavigate } from 'react-router-dom';
import './DogRegistration.css';
import { InputField } from '../Component/Form_compo/login_input';
import { Button_submit } from '../Component/Form_compo/button_submit';

const DogRegistrationForm = () => {
  const [dogName, setDogName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [isNeutered, setIsNeutered] = useState(false);
  const [allergies, setAllergies] = useState('');
  const [message, setMessage] = useState('');
  const { user, updateUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setMessage('로그인이 필요합니다.');
      return;
    }

    try {
      const newDog = {
        id: Date.now().toString(),
        name: dogName,
        breed,
        age,
        weight,
        gender,
        isNeutered,
        allergies
      };

      const updatedUser = {
        ...user,
        dogs: [...(user.dogs || []), newDog]
      };

      const response = await axios.put(`http://localhost:3001/users/${user.id}`, updatedUser);

      console.log('강아지 등록 성공:', response.data);
      setMessage('강아지가 성공적으로 등록되었습니다!');

      updateUser(updatedUser);

      // 폼 초기화
      setDogName('');
      setBreed('');
      setAge('');
      setWeight('');
      setGender('');
      setIsNeutered(false);
      setAllergies('');

      setTimeout(() => navigate('/Home'), 2000);
    } catch (error) {
      console.error('강아지 등록 실패:', error);
      setMessage('강아지 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="dog-registration-container">
      <form className="dog-registration-form" onSubmit={handleSubmit}>
        <h2>강아지 등록</h2>
        <InputField
          value={dogName}
          onChange={(e) => setDogName(e.target.value)}
          placeholder="강아지 이름"
        />
        <InputField
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          placeholder="견종"
        />
        <InputField
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="나이"
        />
        <InputField
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="무게 (kg)"
        />
        <select
          className="login_input_design"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">성별 선택</option>
          <option value="male">수컷</option>
          <option value="female">암컷</option>
        </select>
        <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              checked={isNeutered}
              onChange={(e) => setIsNeutered(e.target.checked)}
            />
            중성화 완료
          </label>
        </div>
        <InputField
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          placeholder="알러지 (쉼표로 구분)"
        />
        <Button_submit text="등록하기" />
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default DogRegistrationForm;
