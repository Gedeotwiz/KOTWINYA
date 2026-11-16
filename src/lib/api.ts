import type { Product } from '../data/products';

const API_BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');
export type TeamMember = { id: string; name: string; role: string; phone: string; email: string; status: 'Active' | 'Invited' };
export type CooperativeTask = { id: string | number; title: string; owner: string; due: string; done: boolean; group: string };
type ApiResponse<T> = { success: boolean; data: T; message?: string };

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, { ...init, headers: { 'Content-Type': 'application/json', ...init?.headers } });
  const body = await response.json().catch(() => ({})) as ApiResponse<T>;
  if (!response.ok) throw new Error(body.message || `API request failed (${response.status})`);
  return body.data;
}

export const api = {
  products: () => request<Product[]>('/products'),
  createProduct: (product: Omit<Product, 'id'> & { stock: number }) => request<Product & { stock: number }>('/products', { method: 'POST', body: JSON.stringify(product) }),
  deleteProduct: (id: string) => request<never>(`/products/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  updateProduct: (id: string, changes: { stock?: number }) => request<Product & { stock: number }>(`/products/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(changes) }),
  team: () => request<TeamMember[]>('/team'),
  createTeamMember: (member: Omit<TeamMember, 'id' | 'status'>) => request<TeamMember>('/team', { method: 'POST', body: JSON.stringify(member) }),
  deleteTeamMember: (id: string) => request<never>(`/team/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  tasks: () => request<CooperativeTask[]>('/tasks'),
  createTask: (task: Omit<CooperativeTask, 'id' | 'done'>) => request<CooperativeTask>('/tasks', { method: 'POST', body: JSON.stringify(task) }),
  updateTask: (id: string | number, changes: Partial<CooperativeTask>) => request<CooperativeTask>(`/tasks/${encodeURIComponent(String(id))}`, { method: 'PATCH', body: JSON.stringify(changes) }),
  deleteTask: (id: string | number) => request<never>(`/tasks/${encodeURIComponent(String(id))}`, { method: 'DELETE' }),
  submitContact: (contact: { name: string; email: string; message: string }) => request<never>('/contact', { method: 'POST', body: JSON.stringify(contact) }),
};
