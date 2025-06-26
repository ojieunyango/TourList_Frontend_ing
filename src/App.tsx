
// 라우팅 기능을 위해 필요한 컴포넌트(라이브러리)들 import
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// 사용자 인증 관련 페이지들
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Mypage from './pages/Mypage/Mypage';
// 게시글 관련 페이지 컴포넌트 임포트
import ThreadList from './pages/Threads/ThreadList';       // 게시글 목록 페이지
import ThreadCreate from './pages/Threads/ThreadCreate';   // 게시글 작성 페이지
import ThreadDetail from './pages/Threads/ThreadDetail';   // 게시글 상세 및 수정 페이지
// 인증 상태 제공하는 Provider로 앱을 감쌈
import AuthProvider  from './context/AuthProvider';
import ProtectedRoute from "./components/ProtectedRoute";
// 헤더 컴포넌트 (모든 페이지 상단에 항상 보여줌)
import Header from "./components/Header";


function App() {
  return (
     // 앱 전체에서 인증 상태를 사용할 수 있도록 감싸줌
    <AuthProvider>
    <BrowserRouter>  {/* 라우팅 기능을 전체 앱에 적용 */}
    <Header /> {/*헤더 항상 표시 */}
      <Routes> {/* 특정 URL(주소)에 대해 어떤 컴포넌트를 보여줄지 결정한걸 묶어줌 */}
          {/* 로그인/회원가입은 아무나 접근 가능 */}
        <Route path="/" element={<Signup />} /> 
        {/*path는 URL 경로, element는 어떤페이지인지 명시: 대시보드 안만들어서회원가입페이지가 홈이다.... */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* 마이페이지는 로그인한 사용자만 접근 가능*/}
        <Route path="/mypage" element={
          <ProtectedRoute> 
            {/* ProtectedRoute가 자식 컴포넌트로 Mypage가 들어가서 정보보호 */}
          <Mypage />
          </ProtectedRoute>} 
       />
         {/* 게시글 관련 페이지들 - 목록, 작성, 상세(수정 포함) 모두 로그인 필요 따라서 ProtectedRoute로 감싸서 인증된 사용자만 접근 가능하도록 함*/}
          {/* 게시글 목록 페이지 */}
         <Route
            path="/thread"   
            element={
              <ProtectedRoute>
                <ThreadList />
              </ProtectedRoute>
            }
          />
         {/* 게시글 작성 페이지 */}
          <Route
            path="/thread/create" 
            element={
              <ProtectedRoute>
                <ThreadCreate />
              </ProtectedRoute>
            }
          />
          {/* 게시글 상세 및 수정 페이지 */}
          <Route
            path="/thread/:threadId"
            element={
              <ProtectedRoute>
                <ThreadDetail />
              </ProtectedRoute>
            }
          />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
