const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  createdAt: string;
}

class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = API_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        credentials: 'include', // Important for cookies
      });

      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      return data;
    } catch (error: any) {
      if (error.success === false) {
        return error;
      }
      return {
        success: false,
        message: error.message || 'An error occurred',
      };
    }
  }

  // Auth endpoints
  async register(data: RegisterData): Promise<ApiResponse<{ user: UserData; accessToken: string }>> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: LoginData): Promise<ApiResponse<{ user: UserData; accessToken: string }>> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async logout(): Promise<ApiResponse> {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async getCurrentUser(): Promise<ApiResponse<{ user: UserData }>> {
    return this.request('/auth/me', {
      method: 'GET',
    });
  }

  async refreshToken(): Promise<ApiResponse<{ accessToken: string }>> {
    return this.request('/auth/refresh', {
      method: 'POST',
    });
  }
}

export const api = new ApiClient();

