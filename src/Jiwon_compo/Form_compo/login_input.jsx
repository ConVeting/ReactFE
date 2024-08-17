import React from 'react';
import './login_input.css'
// 아이디(로그인시) 입력 필드
const InputField_id_login = ({value, onChange }) => {
  return (
    <input className='login_input_design'
        type="text"
        value={value}
        onChange={onChange}
        placeholder="아이디"
        required
    />
  );
};

// 비밀번호(로그인, 회원가입) 입력 필드
const InputField_pwd_login = ({value, onChange }) => {
    return (
      <input className='login_input_design'
          type="password"
          value={value}
          onChange={onChange}
          placeholder="비밀번호"
          required
      />
    );
};

// 디폴트 입력 필드
const InputField = ({value, onChange, placeholder}) => {
  return (
      <input className='login_input_design'
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
  );
}; 

export { InputField_id_login, InputField_pwd_login, InputField};
