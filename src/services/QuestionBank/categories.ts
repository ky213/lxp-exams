import axios from '@/utils/axios';

export async function getAll(): Promise<any> {
  return axios.get<API.QuestionCategory[]>('/api/questionbank/categories');
}

export async function getById(id: string): Promise<any> {
  return axios.get<API.QuestionCategory>(`/api/questionbank/categories/?id=${id}`);
}

export async function create(data: Omit<API.QuestionCategory, 'id'>): Promise<any> {
  return axios.post<any>('/api/questionbank/categories', {
    data,
  });
}

export async function update(data: Partial<API.QuestionCategory>): Promise<any> {
  return axios.put<any>('/api/questionbank/categories', {
    method: 'PUT',
    data,
  });
}

export async function remove(id: string): Promise<any> {
  return axios.delete<any>(`/api/questionbank/categories/?id=${id}`);
}
