import { EventData } from '../types/event';
import { baseApi } from './baseApi';

interface EventsResponse {
  status: string;
  data: EventData[];
}

interface EventResponse {
  status: string;
  data: EventData;
  message?: string;
}

interface CreateEventData {
  title: string;
  description: string;
  date: string;
}

export const getEvents = async (
  startDate?: string,
  endDate?: string,
): Promise<EventData[]> => {
  let url = '/events';

  if (startDate || endDate) {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    url += `?${params.toString()}`;
  }

  const response = await baseApi.get<EventsResponse>(url);
  return response.data.data;
};

export const getEventById = async (id: string): Promise<EventData> => {
  const response = await baseApi.get<EventResponse>(`/events/${id}`);
  return response.data.data;
};

export const createEvent = async (
  data: CreateEventData,
): Promise<EventData> => {
  const response = await baseApi.post<EventResponse>('/events', data);
  return response.data.data;
};

export const updateEvent = async (
  id: string,
  data: Partial<CreateEventData>,
): Promise<EventData> => {
  const response = await baseApi.put<EventResponse>(`/events/${id}`, data);
  return response.data.data;
};

export const deleteEvent = async (id: string): Promise<void> => {
  await baseApi.delete(`/events/${id}`);
};
