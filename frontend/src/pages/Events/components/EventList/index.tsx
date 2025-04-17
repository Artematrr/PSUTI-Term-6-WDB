import { FC } from 'react';
import Event from '../Event';
import styles from '../../index.module.scss';
import { EventData } from '../../../../types/event';

interface EventListProps {
  events: EventData[];
}

const EventList: FC<EventListProps> = ({ events }) => {
  return (
    <div className={styles['events-list']}>
      {events && events.length > 0 ? (
        events.map((event) => (
          <Event
            key={event.id}
            title={event.title}
            description={event.description}
            date={event.date}
            createdBy={event.createdBy}
          />
        ))
      ) : (
        <p className="paragraph">Нет доступных мероприятий</p>
      )}
    </div>
  );
};

export default EventList;
