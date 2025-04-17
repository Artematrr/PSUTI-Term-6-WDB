import { clearAuth, setToken, setUserData } from '../utils/localStorage';
import { baseApi } from './baseApi';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  status: string;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    role?: string;
  };
  token?: string;
}

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await baseApi.post<AuthResponse>('/auth/register', data);
    return response.data;
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    throw error;
  }
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const response = await baseApi.post<AuthResponse>('/auth/login', data);

    if (response.data.token) {
      setToken(response.data.token);
      setUserData(response.data.data);
    }

    return response.data;
  } catch (error) {
    console.error('Ошибка при авторизации:', error);
    throw error;
  }
};

export const logout = (): void => {
  clearAuth();
};
