import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import { ru } from 'date-fns/locale/ru';
import styles from './index.module.scss';

registerLocale('ru', ru);

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <>
      <h2 className={styles['datepicker__title']}>Отфильтруйте мероприятия по диапазону</h2>
      <div className={styles['datepicker__container']}>
        <DatePicker
          locale="ru"
          selected={startDate}
          onChange={onStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Начальная дата"
          minDate={new Date('01-01-2025')}
          maxDate={new Date('12-31-2025')}
        />
        <DatePicker
          locale="ru"
          selected={endDate}
          onChange={onEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          placeholderText="Конечная дата"
          minDate={new Date('01-01-2025')}
          maxDate={new Date('12-31-2025')}
        />
      </div>
    </>
  );
};

export { DateRangePicker };
