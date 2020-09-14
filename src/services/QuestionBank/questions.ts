import axios from '@/utils/axios';
import { Question } from '@/models/questions';

export async function getAll(): Promise<any> {
  return axios.get<Question[]>('/api/questionbank/questions');
}

export async function getById(id: string): Promise<any> {
  return axios.get<Question>(`/api/questionbank/questions/?id=${id}`);
}

export async function create(data: Omit<Question, 'id'>): Promise<any> {
  return axios.post<any>('/api/questionbank/questions', {
    data,
  });
}

export async function update(data: Partial<Question>): Promise<any> {
  return axios.put<any>('/api/questionbank/questions', {
    method: 'PUT',
    data,
  });
}

export async function remove(id: string): Promise<any> {
  return axios.delete<any>(`/api/questionbank/questions/?id=${id}`);
}
