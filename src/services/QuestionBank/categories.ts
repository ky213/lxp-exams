import axios from '@/utils/axios';
import { Category } from '@/models/categories';

export async function getAll(): Promise<any> {
  return axios.get<Category[]>('/api/questionbanks/categories');
}

export async function getById(id: string): Promise<any> {
  return axios.get<Category>(`/api/questionbanks/categories/?id=${id}`);
}

export async function create(data: Omit<Category, 'id'>): Promise<any> {
  return axios.post<any>('/api/questionbanks/categories', data);
}

export async function update(data: Partial<Category>): Promise<any> {
  return axios.put<any>('/api/questionbanks/categories', data);
}

export async function remove(id: string): Promise<any> {
  return axios.delete<any>(`/api/questionbanks/categories/?id=${id}`);
}
