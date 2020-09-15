import axios from '@/utils/axios';
import { Question } from '@/models/questions';

export async function getAll(): Promise<any> {
  return axios.get<Question[]>('/api/questionbanks/questions');
}

export async function getById(id: string): Promise<any> {
  return axios.get<Question>(`/api/questionbanks/questions/?id=${id}`);
}

export async function create(data: Omit<Question, 'id'>): Promise<any> {
  return axios.post<any>('/api/questionbanks/questions', {
    data,
  });
}

export async function update(data: Partial<Question>): Promise<any> {
  return axios.put<any>('/api/questionbanks/questions', {
    method: 'PUT',
    data,
  });
}

export async function remove(id: string): Promise<any> {
  return axios.delete<any>(`/api/questionbanks/questions/?id=${id}`);
}
