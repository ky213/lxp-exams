import axios from '@/utils/axios';
import { Exam } from '@/models/exams';

export async function getAll(): Promise<any> {
  return axios.get<Exam[]>('/api/exams');
}

export async function getById(id: string): Promise<any> {
  return axios.get<Exam>(`/api/exams/${id}`);
}

export async function create(data: Omit<Exam, 'id'>): Promise<any> {
  return axios.post<any>('/api/exams', data);
}

export async function update(data: Partial<Exam>): Promise<any> {
  return axios.put<any>('/api/exams', data);
}

export async function remove(id: string): Promise<any> {
  return axios.delete<any>(`/api/exams/${id}`);
}