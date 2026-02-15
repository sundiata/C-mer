// API Service for Admin Panel Backend Communication
import { API_BASE_URL } from '../config';

console.log('🔧 API Service: Initializing with base URL:', API_BASE_URL);

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
    console.log('🔧 API Service: Constructor called, baseURL:', this.baseURL);
  }

  // Blogs API
  async listBlogs(params: { page?: number; limit?: number; status?: string; q?: string } = {}) {
    const query = new URLSearchParams();
    if (params.page) query.set('page', String(params.page));
    if (params.limit) query.set('limit', String(params.limit));
    if (params.status) query.set('status', params.status);
    if (params.q) query.set('q', params.q);
    const qs = query.toString();
    return this.get<{ success: boolean; data: any[]; pagination: any }>(`/blogs${qs ? `?${qs}` : ''}`);
  }

  async createBlog(post: any) {
    return this.post<{ success: boolean; data: any }>(`/blogs`, post);
  }

  async updateBlog(id: number, post: any) {
    return this.put<{ success: boolean; data: any }>(`/blogs/${id}`, post);
  }

  async deleteBlog(id: number) {
    return this.delete<{ success: boolean }>(`/blogs/${id}`);
  }

  // Get stored token
  private getToken(): string | null {
    return localStorage.getItem('admin_token');
  }

  // Set token in localStorage
  private setToken(token: string): void {
    localStorage.setItem('admin_token', token);
  }

  // Remove token from localStorage
  private removeToken(): void {
    localStorage.removeItem('admin_token');
  }

  // Get authorization headers
  private getAuthHeaders(): HeadersInit {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  // Generic request method
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    console.log(`🔧 API Service: Making request to: ${url}`, options.method || 'GET');

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getAuthHeaders(),
          ...options.headers,
        },
      });

      console.log(`🔧 API Service: Response status: ${response.status}`);

      const data = await response.json();
      console.log(`🔧 API Service: Response data:`, data);

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`🔧 API Service: Request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Authentication methods
  async login(username: string, password: string) {
    const response = await this.request<{
      success: boolean;
      message: string;
      data: {
        token: string;
        user: {
          id: number;
          username: string;
          name: string;
          email: string;
          role: string;
        };
      };
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    if (response.success && response.data.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async logout() {
    try {
      await this.request('/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      // Even if logout fails on server, remove local token
      console.warn('Server logout failed, but removing local token:', error);
    } finally {
      this.removeToken();
    }
  }

  async verifyToken() {
    return this.request<{
      success: boolean;
      message: string;
      data: {
        user: {
          userId: number;
          username: string;
          role: string;
        };
      };
    }>('/auth/verify', {
      method: 'GET',
    });
  }

  // Health check
  async healthCheck() {
    return this.request<{
      success: boolean;
      message: string;
      timestamp: string;
      environment: string;
    }>('/health');
  }

  // Generic CRUD operations for future use
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Projects API
  async listProjects() {
    return this.get<{ success: boolean; data: any[] }>(`/projects`);
  }

  async createProject(project: any) {
    return this.post<{ success: boolean; data: any }>(`/projects`, project);
  }

  async updateProject(id: number, project: any) {
    return this.put<{ success: boolean; data: any }>(`/projects/${id}`, project);
  }

  async deleteProject(id: number) {
    return this.delete<{ success: boolean }>(`/projects/${id}`);
  }

  // Contacts API
  async listContacts() {
    return this.get<{ success: boolean; data: any[] }>(`/contacts`);
  }

  // Users API (settings)
  async updateProfile(data: { username: string; name: string }) {
    return this.put<{ success: boolean; data: any }>(`/users/me/profile`, data);
  }

  async changePassword(data: { currentPassword: string; newPassword: string }) {
    return this.put<{ success: boolean; message: string }>(`/users/me/password`, data);
  }

  async createAdmin(data: { username: string; password: string; email?: string; name?: string }) {
    return this.post<{ success: boolean; data: any }>(`/users/admin`, data);
  }

  // Dashboard
  async getDashboardSummary() {
    return this.get<{ success: boolean; data: { summary: any; recent: any } }>(`/dashboard/summary`);
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
