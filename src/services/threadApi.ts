import api from './api';
import { Thread, ThreadRequest } from '../types/thread';

/** 모든 게시글 목록 조회 */
export const getThreads = async (): Promise<Thread[]> => {
  const response = await api.get('/thread');
  return response.data;
};

/** 게시글 작성 */
export const createThread = async (thread: ThreadRequest): Promise<Thread> => {
  const response = await api.post('/thread', thread);
  return response.data;
};

/** 게시글 상세 조회 (Id로 조회하는거임) */
export const getThreadById = async (threadId: number): Promise<Thread> => {
  const response = await api.get(`/thread/${threadId}`);
  return response.data;
};

/** 게시글 삭제 */
export const deleteThread = async (threadId: number): Promise<void> => {
  await api.delete(`/thread/${threadId}`);
};

/** 게시글 수정 */
export const updateThread = async (threadId: number, thread: ThreadRequest): Promise<Thread> => {
  const response = await api.put(`/thread/${threadId}`, thread);
  return response.data;
};

/** 좋아요 기능 (게시글 좋아요 수 증가 등 처리) */
export const likeThread = async (threadId: number): Promise<Thread> => {
  const response = await api.post(`/thread/${threadId}/like`);
  return response.data;
};
/** 게시글 검색 기능  */
export const searchThreads = async (keyword: string): Promise<Thread[]> => {
  const response = await api.get(`/thread/search?keyword=${encodeURIComponent(keyword)}`);
  return response.data;
};
