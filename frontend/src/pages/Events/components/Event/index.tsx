import { FC } from 'react';
import styles from '../../index.module.scss';

interface EventProps {
  title: string;
  description: string;
  date: string;
  createdBy: string;
}

const Event: FC<EventProps> = ({ title, description, date, createdBy }) => {
  return (
    <div className={styles.event}>
      <h2 className={styles.event__title}>{title}</h2>
      <p className={styles.event__description}>{description}</p>
      <p className={styles.event__date}>Дата: {date}</p>
      <p className={styles.event__createdBy}>ID создателя: {createdBy}</p>
    </div>
  );
};

export default Event; 