import { useState, useEffect } from 'react';
import EventList from './components/EventList';
import { getEvents } from '../../api/eventService';
import { ErrorNotification } from '../../components/ErrorNotification';
import { EventData } from '../../types/event';
import { DateRangePicker } from './components/DateRangePicker';

const Events = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<{
    message: string;
    status: number;
  } | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const data = await getEvents(
        startDate ? startDate.toISOString() : undefined,
        endDate ? endDate.toISOString() : undefined,
      );
      setEvents(data);
      setError(null);
    } catch (error: unknown) {
      const apiError = error as {
        response?: {
          data?: {
            message?: string;
          };
          status?: number;
        };
      };

      setError({
        message:
          apiError?.response?.data?.message ||
          'Не удалось загрузить мероприятия',
        status: apiError?.response?.status || 500,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [startDate, endDate]);

  return (
    <div className="container">
      <h1 className="title">Мероприятия</h1>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />
      {isLoading && <p className="paragraph">Загрузка мероприятий...</p>}
      {error && (
        <ErrorNotification
          message={error.message}
          status={error.status}
          onClose={() => setError(null)}
          autoClose={false}
        />
      )}
      {!isLoading && !error && <EventList events={events} />}
    </div>
  );
};

export default Events;
