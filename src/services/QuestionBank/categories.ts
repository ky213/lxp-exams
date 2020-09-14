import axios from '@/utils/axios';
import { Category } from '@/models/categories';

export async function getAll(): Promise<any> {
  return axios.get<Category[]>('/api/questionbank/categories');
}

export async function getById(id: string): Promise<any> {
  return axios.get<Category>(`/api/questionbank/categories/?id=${id}`);
}

export async function create(data: Omit<Category, 'id'>): Promise<any> {
  return axios.post<any>('/api/questionbank/categories', {
    data,
  });
}

export async function update(data: Partial<Category>): Promise<any> {
  return axios.put<any>('/api/questionbank/categories', {
    method: 'PUT',
    data,
  });
}

export async function remove(id: string): Promise<any> {
  return axios.delete<any>(`/api/questionbank/categories/?id=${id}`);
}
