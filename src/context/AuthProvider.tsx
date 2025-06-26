import { useState, useEffect, ReactNode } from 'react';
import AuthContext from './AuthContext';  
// 토큰 저장, 조회, 삭제 유틸 함수 (utils/token.ts)
import { getToken, setToken, removeToken } from '../utils/token';  // localStorage 관련 유틸 함수들

// 로그인한 사용자 정보를 담을 타입 (AuthContext.ts에서 선언한 User 타입과 동일하게 맞추세요)
interface User {
  userId: number;
  username: string;
}
// AuthProvider가 받는 props 타입 정의: children (하위 컴포넌트들)
interface AuthProviderProps {
  children: ReactNode;
}
// AuthProvider 컴포넌트 정의: 인증 관련 상태와 함수들을 Context로 제공
const AuthProvider = ({ children }: AuthProviderProps) => {
  // token 상태: 초기값은 localStorage에서 불러온 토큰 또는 null
  const [token, setTokenState] = useState<string | null>(getToken());
    // user 상태: 로그인한 사용자 정보 저장 (없으면 null)
    const [user, setUser] = useState<User | null>(null);

      /**
   * 로그인 함수
   * @param newToken - 로그인 성공 후 받은 JWT 토큰 문자열
   * @param newUser - 로그인 성공 후 받아온 사용자 정보 객체
   */

    // 로그인 함수: 새로운 토큰을 받아서 localStorage와 상태에 저장
  const login = (newToken: string, newUser: User) => {
    setToken(newToken); // localStorage에 토큰 저장
    setTokenState(newToken); // 상태 업데이트 - 로그인 상태 됨
    setUser(newUser);        // 상태 업데이트 - 사용자 정보 저장
  };

  // 로그아웃 함수: 토큰을 localStorage에서 삭제하고 상태 초기화
  const logout = () => {
    removeToken();  // localStorage에서 토큰 삭제
    setTokenState(null);  // 상태 초기화 (로그아웃 상태)
    setUser(null);     // user 상태 초기화
  };

   // 현재 로그인 상태 판단: 토큰이 있으면 true, 없으면 false
  const isAuthenticated = !!token;

   // 컴포넌트가 처음 마운트 될 때 localStorage에서 토큰 다시 읽어 상태 초기화
   // 새로고침해도 로그인 상태를 유지하게 하기 위한 처리
  useEffect(() => {
    const storedToken = getToken();  // localStorage에서 토큰 읽기
    if (storedToken) {
      setTokenState(storedToken);  // 상태 업데이트
      // 참고: 새로고침 후 user 정보는 별도 저장, 복원하는 로직이 필요함
      // 예) localStorage에 user 정보 저장 후 불러오기 또는 백엔드에서 사용자 정보 다시 요청
    
    }
  }, []);
 
  // Context.Provider를 통해 하위 컴포넌트들에게 인증 상태 및 함수를 자식 컴포넌트로 전달
  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; // 이 컴포넌트를 기본 내보내기로 export
