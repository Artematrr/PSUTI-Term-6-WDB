import { FC, useState, useEffect } from 'react';
import styles from './index.module.scss';

export interface ErrorNotificationProps {
  message: string;
  status: number;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseTime?: number;
}

const ErrorNotification: FC<ErrorNotificationProps> = ({
  message,
  status,
  onClose,
  autoClose = true,
  autoCloseTime = 2000,
}) => {
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const handleClose = () => {
    // Запуск анимации закрытия
    setIsClosing(true);

    setTimeout(() => {
      onClose();
    }, 100);
  };

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoCloseTime);

      // Очищаем таймер при размонтировании компонента
      return () => {
        clearTimeout(timer);
      };
    }
  });

  return (
    <div
      className={`${styles.notification} ${isClosing ? styles['slide-out'] : ''}`}
    >
      <div className={styles.content}>
        <div className={styles.status}>{status}</div>
        <div className={styles.message}>{message}</div>
      </div>
      <button className={styles['close-button']} onClick={handleClose}>
        ×
      </button>
    </div>
  );
};

export { ErrorNotification };
