// import { useEffect, useState, useContext } from 'react'; 
// // useEffect: 컴포넌트가 렌더링 된 후 특정 작업 실행할 때 사용
// // useState: 상태(데이터)를 관리할 때 사용
// // useContext: 전역 상태인 AuthContext에서 인증 정보 가져오기

// import { getUserProfile, updateUserProfile, getUserIdByUsername } from '../../services/userApi';
// // 백엔드 API 호출 함수 불러오기 (사용자 정보 조회)

// import { UserResponse, UserUpdateRequest } from '../../types/user';
// // 타입 정의: 조회용(UserResponse), 수정용(UserUpdateRequest)

// // 현재 로그인 상태, 토큰 등 인증 정보 가져오는 훅
// import { AuthContext } from '../../context/AuthContext';



// const Mypage = () => {  // 마이페이지 컴포넌트 함수 시작
//   const { token } = useContext(AuthContext);  // 현재 로그인 토큰을 가져옴

//   // user 정보 상태: 서버에서 받아온 사용자 정보를 저장, 초기값은 null (아직 없음)
//   const [user, setUser] = useState<UserResponse | null>(null);

//   const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부

//   // loading 상태 선언: 사용자 정보 요청 중인지 여부, 초기값은 true (로딩 중)
//   const [loading, setLoading] = useState(true);

//   // error 상태 선언: 에러 메시지 저장, 초기값은 빈 문자열 (에러 없음)
//   const [error, setError] = useState('');

//   // 수정 form 상태
//   const [form, setForm] = useState<UserUpdateRequest>({
//     username: '',
//     name: '',
//     email: '',
//     phone: '',
//     nickname: '',
//     password: ''
//   });

//   // 컴포넌트가 화면에 처음 나타나거나 token 값이 바뀔 때 실행
//   useEffect(() => {
//     if (!token) return;  // 토큰이 없으면 함수 실행 안함(로그인 안 된 상태)

//     // JWT 토큰에서 userId 추출 (아래는 기본적인 디코딩 방법 예시)
//     const payload = JSON.parse(atob(token.split('.')[1]));
//     const userId = payload.sub; // JWT 페이로드에서 username 꺼내기
//     console.log(payload);

//     // 백엔드에 사용자 정보 요청
//     getUserProfile(userId)
//       .then(data => {
//         setUser(data);     // 성공하면 user 상태에 사용자 정보 저장
//         setForm(data);         // form에도 초기값 세팅
//         setLoading(false); // 로딩 완료 상태로 변경
//       })
//       .catch((err) => {
//         console.error(err);
//         setError('사용자 정보를 불러오는데 실패했습니다.');  // 실패하면 에러 메시지 저장
//         setLoading(false); // 로딩 완료 상태로 변경
//       });
//   }, [token]);  // token 값이 바뀔 때마다 이 useEffect 재실행

//     // input 값 변경 핸들러
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       const { name, value } = e.target;
//       setForm(prev => ({ ...prev, [name]: value }));
//     };
//    // 수정 저장 버튼 클릭 시 실행
//    const handleSave = async () => {
//     if (!token || !user) return;

//     const payload = JSON.parse(atob(token.split('.')[1]));
//     const userId = payload.userId;
  
//     try {
//       const updatedUser = await updateUserProfile(userId, form); //사용자 정보 수정 API 호출
//       setUser(updatedUser);       // 최신 사용자 정보로 업데이트
//       setIsEditing(false);       // 수정 모드 종료
//       alert('정보가 성공적으로 수정되었습니다!');
//     } catch (err) {
//       console.error(err);
//       alert('수정 실패');
//     }
//   };
  
  
//   // 로딩 중일 때 화면에 표시
//   if (loading) return <p>로딩 중...</p>;

//   // 에러가 있을 때 화면에 표시
//   if (error) return <p style={{color: 'red'}}>{error}</p>;

//   // 정상적으로 user 정보가 있을 때 화면에 표시
//   return (
//     <div>
//       <h2>마이페이지</h2>
//       {user && (
//         <> {/* 사용자 정보 출력 (수정 전) */}
//           <p>User Id:{user.userId} </p>
//           <p>User Name: {user.username}</p>
//           <p>이름: {user.name}</p>
//           <p>닉네임: {user.nickname}</p>
//           <p>이메일: {user.email}</p>
//           <p>폰번호: {user.phone}</p>
//           <button onClick={() => setIsEditing(true)}>회원정보 수정</button>
//         </>
//       )}
//        {/* 수정 폼 UI (isEditing이 true일 때만) */}
//        {user && isEditing && (
//         <>
//           <p>User Id: {user.userId}</p>
//           <p>User Name: {user.username}</p>
//           <input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             placeholder="이름"
//           />
//           <input
//             name="nickname"
//             value={form.nickname}
//             onChange={handleChange}
//             placeholder="닉네임"
//           />
//           <input
//             name="email"
//             type="email"
//             value={form.email}
//             onChange={handleChange}
//             placeholder="이메일"
//           />
//           <br /> {/* userId(PK), username(로그인 ID), phone(폰번호는 문자인증요구하는겨우많아서)는 사용자 식별을 위해 수정불가 */}
//           <button onClick={handleSave}>저장</button>
//           <button onClick={() => setIsEditing(false)}>취소</button>
//         </>
//       )}
//     </div>
//   );
// };

// export default Mypage;  // 다른 파일에서 import 가능하도록 내보내기


import { useEffect, useState, useContext } from 'react';
import {
  getUserProfile,
  updateUserProfile,
  getUserIdByUsername,
} from '../../services/userApi'; // API 함수들
import {
  UserResponse,
  UserUpdateRequest,
} from '../../types/user'; // 타입
import { AuthContext } from '../../context/AuthContext'; // 인증 정보

const Mypage = () => {
  const { token } = useContext(AuthContext);

  const [user, setUser] = useState<UserResponse | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [form, setForm] = useState<UserUpdateRequest>({
    username: '',
    name: '',
    email: '',
    phone: '',
    nickname: '',
    password: '',
  });

  // 컴포넌트 마운트 시 사용자 정보 조회
  useEffect(() => {
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log(payload);
      const username = payload.sub;

      if (!username) {
        setError('유효하지 않은 사용자입니다.');
        setLoading(false);
        return;
      }

      // username → userId → userProfile 조회
      getUserIdByUsername(username)
        .then((userId) => getUserProfile(userId))
        .then((data) => {
          setUser(data);
          setForm(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError('사용자 정보를 불러오는데 실패했습니다.');
          setLoading(false);
        });
    } catch (err) {
      console.error(err);
      setError('토큰 파싱 오류');
      setLoading(false);
    }
  }, [token]);

  // input 값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 저장 버튼 클릭 시 사용자 정보 수정
  const handleSave = async () => {
    if (!token || !user) return;

    try {
      const updatedUser = await updateUserProfile(user.userId, form);
      setUser(updatedUser);
      setIsEditing(false);
      alert('정보가 성공적으로 수정되었습니다!');
    } catch (err) {
      console.error(err);
      alert('수정 실패');
    }
  };

  // 로딩 중
  if (loading) return <p>로딩 중...</p>;

  // 에러 발생 시
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>마이페이지</h2>
      {user && (
        <>
          {/*<p>User Id: {user.userId}</p>*/}
          <p>User Name: {user.username}</p>
          <p>이름: {user.name}</p>
          <p>닉네임: {user.nickname}</p>
          <p>이메일: {user.email}</p>
          <p>폰번호: {user.phone}</p>
          <button onClick={() => setIsEditing(true)}>회원정보 수정</button>
        </>
      )}

      {/* 수정 폼 */}
      {user && isEditing && (
        <>
          {/*<p>User Id: {user.userId}</p>*/}
          <p>User Name: {user.username}</p>
          <div>
          <label htmlFor="name">이름</label><br />
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="이름"
          /> </div>
            <div>
          <label htmlFor="nickname">닉네임</label><br />
          <input
            name="nickname"
            value={form.nickname}
            onChange={handleChange}
            placeholder="닉네임"
          /></div>
          <div>
          <label htmlFor="email">이메일</label><br />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="이메일"
          /></div>
          <br />
          <button onClick={handleSave}>저장</button>
          <button onClick={() => setIsEditing(false)}>취소</button>
        </>
      )}
    </div>
  );
};

export default Mypage;
