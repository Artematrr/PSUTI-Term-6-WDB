import { NavLink, useNavigate } from 'react-router-dom';
import { getUserData, clearAuth }  from'../../utils/localStorage';
import styles from './index.module.scss';
import { useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const userData = getUserData();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleLogout = () => {
    clearAuth();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div
          className={`${styles['nav-links']} ${isMenuOpen ? styles.open : ''}`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Главная
          </NavLink>
          <NavLink
            to="/events"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Мероприятия
          </NavLink>

          {!userData && (
            <div className={styles['user-area']}>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Регистрация
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Вход
              </NavLink>
            </div>
          )}
          {userData && (
            <div className={styles['user-area']}>
              <span className={styles.user}>{userData.name}</span>
              <button
                onClick={handleLogout}
                className={styles['logout-button']}
              >
                Выйти
              </button>
            </div>
          )}
        </div>

        <button onClick={toggleMenu} className={styles['mobile-menu-button']}>
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </nav>
    </header>
  );
};

export default Header;
