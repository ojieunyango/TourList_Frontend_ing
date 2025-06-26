import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 훅
import { login } from '../../services/userApi'; // 로그인 API 함수 불러오기
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';


const Login = () => {
  
  const navigate = useNavigate();  // 페이지 이동 함수 준비
  //사용자가 로그인시 전체앱에 기억하기위해서 사용 
  const { login: loginContext } = useContext(AuthContext);
  // 로그인 폼에 입력한 username 상태 저장
  const [username, setUsername] = useState('');
   // 로그인 폼에 입력한 password 상태 저장
  const [password, setPassword] = useState('');
  // 로그인 실패 시 에러 메시지를 저장할 상태
  const [error, setError] = useState('');

   // 로그인 폼 제출 시 호출되는 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로드 막기
    try {
      const data = { username, password }; // 입력값 객체로 준비
      const response = await login(data);  // API 호출 - 로그인 시도
      // 로그인 성공 시 받은 JWT 토큰을 로컬 스토리지에 저장: 로컬스토리지는 웹브라우저에 저장되는거임
      localStorage.setItem('token', response.token);
      //localStorage.setItem('userId', response.userId.toString());
      
      loginContext(response.token,  { 
        userId: response.userId,  // 백엔드에서 받은 userId 전달
        username: response.username // 백엔드에서 받은 username 전달
      } );

      // 로그인 성공 시 마이페이지로 이동
      navigate('/mypage');
    } catch (err) {  // 로그인 실패 시 에러 메시지 상태에 저장
      setError('로그인 실패: 아이디 또는 비밀번호를 확인하세요.');
    }
  };

  return (
    <div>
      <h2>로그인 페이지입니다.</h2>
      {/* 로그인 폼 */}
      <form onSubmit={handleSubmit}>
         {/* 사용자명 입력 필드 */}
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          required 
        />
        {/* 비밀번호 입력 필드 */}
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
        />
        {/* 제출 버튼 */}
        <button type="submit">로그인</button>
      </form>
      {/* 에러 메시지 표시 (있을 때만) */}
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  );
};

export default Login;
