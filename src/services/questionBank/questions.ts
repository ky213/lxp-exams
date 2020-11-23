import axios from '@/utils/axios';
import { Question } from '@/models/questions';
import { AxiosResponse } from 'axios';

export async function getAll(): Promise<AxiosResponse<Question[]>> {
  return axios.get<Question[]>('/api/questionbanks/questions');
}

export async function getById(id: string): Promise<AxiosResponse<Question>> {
  return axios.get<Question>(`/api/questionbanks/questions/${id}`);
}

export async function getQuesionsByCategories(
  categories: string[],
): Promise<AxiosResponse<Question[]>> {
  return axios.post<Question[]>(`/api/questionbanks/questions/categories/content/all`, categories);
}

export async function create(data: Omit<Question, 'id'>): Promise<any> {
  return axios.post<any>('/api/questionbanks/questions', data);
}

export async function update(data: Partial<Question>): Promise<any> {
  return axios.put<any>('/api/questionbanks/', data);
}

export async function remove(id: string): Promise<any> {
  return axios.delete<any>(`/api/questionbanks/questions/${id}`);
}
