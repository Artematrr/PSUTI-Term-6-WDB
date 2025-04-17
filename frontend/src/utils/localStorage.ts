import { Token, UserData } from '../types/user';

const TOKEN_KEY = 'token';
const USER_DATA_KEY = 'userData';

export const getToken = (): Token | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: Token): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getUserData = (): UserData | null => {
  const userData = localStorage.getItem(USER_DATA_KEY);
  return userData ? JSON.parse(userData) : null;
};

export const setUserData = (userData: UserData): void => {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
};

export const removeUserData = (): void => {
  localStorage.removeItem(USER_DATA_KEY);
};

export const clearAuth = (): void => {
  removeToken();
  removeUserData();
};
