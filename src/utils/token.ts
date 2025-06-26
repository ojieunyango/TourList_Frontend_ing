const TOKEN_KEY = 'authToken';
const TOKEN_KEY2 = 'token';

// 토큰 저장
export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// 토큰 가져오기
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

// 토큰 삭제
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_KEY2);
};
