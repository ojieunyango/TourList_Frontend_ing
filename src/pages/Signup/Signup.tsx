// React 기본 기능 가져오기
import React, { useState } from 'react';

// 우리가 만든 회원가입 API 함수 불러오기
import { signup } from '../../services/userApi';

// 회원가입 요청에 사용할 데이터 타입 정의 불러오기 (.d.ts 확장자를 빼고 쓴거)
import { SignupRequest } from '../../types/user';

function Signup() {
  // 📌 form: 사용자 입력값들을 저장할 상태 객체
  // 처음에는 모든 값이 빈 문자열로 초기화되어 있음
  const [form, setForm] = useState<SignupRequest>({ //UserRequestDto에 맞춰서 필요한 필드만 담음
    username: '',
    password: '',
    email: '',
    name: '',
    nickname: '',
    phone: ''
  });

  // 📌 error: 에러 메시지를 보여주기 위한 상태
  const [error, setError] = useState('');

  // ✅ 사용자가 input에 입력할 때마다 호출됨
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // name: 입력창 이름, value: 입력된 값
    // 기존 form 상태를 복사한 후, 해당 name에 해당하는 값을 갱신
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // ✅ 회원가입 폼이 제출되었을 때 호출되는 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 새로고침 방지
    console.log('보내는 form:', form);

    try {
      await signup(form); // form에 담긴 사용자 데이터를 백엔드에 전송
      alert('회원가입 성공!'); // 성공 시 메시지 표시
      // TODO: 로그인 페이지로 이동하거나 form 초기화 가능
    } catch (err) {
      setError('회원가입 실패'); // 실패 시 에러 메시지 표시
    }
  };

  return (
    <div>
      <h2>회원가입</h2>

      {/* 📌 회원가입 입력 폼 */}
      <form onSubmit={handleSubmit}>
        {/* 각각의 input은 form 상태의 값을 보여주고, 값이 변경되면 handleChange로 업데이트됨 */}
        <input name="username" value={form.username} onChange={handleChange} placeholder="아이디" required />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="비밀번호" required />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="이메일" required />
        <input name="name" value={form.name} onChange={handleChange} placeholder="이름" required />
        <input name="nickname" value={form.nickname} onChange={handleChange} placeholder="닉네임" required />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="전화번호" required />
        
        {/* 제출 버튼 */}
        <button type="submit">회원가입 제출</button>
      </form>

      {/* ❗️에러가 있을 경우 빨간색으로 에러 메시지 출력 */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

// 이 컴포넌트를 다른 파일에서 사용할 수 있도록 export
export default Signup;
