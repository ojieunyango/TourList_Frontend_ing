import { useContext } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동 기능 제공
import { AuthContext } from "../context/AuthContext"; //   인증 상태 가져오기

// LogoutButton 컴포넌트 정의
const LogoutButton = () => {
  // logout 함수: context에서 제공한 로그아웃 함수 (토큰 삭제 & 상태 초기화)
  const { logout } = useContext(AuthContext);
   // useNavigate 훅: 페이지 이동을 위한 함수
  const navigate = useNavigate();

  // 로그아웃 버튼 클릭 시 실행될 함수
  const handleLogout = () => {
    logout();             // 토큰 삭제 + 상태 초기화
    navigate("/login");   // 로그인 페이지로 이동
  };
 // 실제 렌더링되는 버튼
  return <button onClick={handleLogout}>로그아웃</button>; // 🔹 로그아웃 버튼
};

export default LogoutButton;  // 다른 파일에서도 이 컴포넌트를 사용할 수 있게 export
 