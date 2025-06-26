// 리액트 라우터의 Link: <a href> 대신 페이지 이동을 해주는 컴포넌트
import { Link } from "react-router-dom";

// 인증 상태를 확인하기 위해 Context 사용
import { useContext } from "react";

// 우리가 만든 인증 상태 Context를 불러옴
import { AuthContext } from "../context/AuthContext";

// 로그아웃을 실행하는 버튼 컴포넌트를 불러옴
import LogoutButton from "./LogoutButton";

// 헤더 컴포넌트 정의 (앱 상단에 항상 표시되는 메뉴바 같은 역할)
const Header = () => {
  // Context에서 현재 로그인 상태(isAuthenticated)를 가져옴
  const { isAuthenticated } = useContext(AuthContext);

  return (
    // 헤더 전체 영역 (간단한 테두리와 여백 스타일 적용)
    <header style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      {/* 네비게이션 메뉴: 버튼이나 링크들을 가로로 나열 */}
      <nav style={{ display: "flex", gap: "10px" }}>
        {/* 홈으로 이동하는 링크 (클릭하면 / 주소로 이동) */}
        <Link to="/">홈</Link>

        {/* 로그인 상태일 때 보여줄 메뉴 */}
        {isAuthenticated ? (
          <>
           {/* 게시판(글 목록)으로 이동하는 링크 추가 */}
            <Link to="/thread">게시판</Link>
            {/* 마이페이지로 이동하는 링크 */}
            <Link to="/mypage">마이페이지</Link>
            {/* 로그아웃 버튼 표시 */}
            <LogoutButton />
          </>
        ) : (
          // 로그인되어 있지 않을 때 보여줄 메뉴
          <>
            {/* 로그인 페이지로 이동하는 버튼 */}
            <Link to="/login">로그인</Link>
            {/* 회원가입 페이지로 이동하는 버튼 */}
            <Link to="/signup">회원가입</Link>
          </>
        )}
      </nav>
    </header>
  );
};

// 이 컴포넌트를 다른 곳에서도 쓸 수 있게 내보냄
export default Header;
