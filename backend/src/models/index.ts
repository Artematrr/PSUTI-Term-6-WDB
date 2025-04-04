import User from '@models/User';
import Event from '@models/Event';

User.hasMany(Event, { foreignKey: 'createdBy' });
Event.belongsTo(User, { foreignKey: 'createdBy' });

// Типы для использования в сервисах и контроллерах
export type UserRole = 'user' | 'admin';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
}

export interface ICurrentUser {
  id: string;
  role: UserRole;
}

export interface IUserData {
  name: string;
  email: string;
}

export interface IRegisterData {
  name: string;
  email: string;
  password: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IAuthResponse {
  user: User;
  token?: string;
}

export interface IEventData {
  title: string;
  description?: string;
  date: Date;
  createdBy: string;
}

export interface IEventUpdateResult {
  current: Event;
  previous: Event;
}

export { User, Event };
