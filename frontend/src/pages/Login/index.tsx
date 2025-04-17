import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../api/authService';
import { getUserData } from '../../utils/localStorage';
import { ErrorNotification } from '../../components/ErrorNotification';

const Login = () => {
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
  }>({
    email: 'art2@gmail.com',
    password: 'art2123',
  }); // С данными для тестирования
  const [error, setError] = useState<{
    message: string;
    status: number;
  } | null>(null);
  const navigate = useNavigate();
  const userData = getUserData();

  useEffect(() => {
    if (userData) {
      navigate('/events');
    }
  }, [userData, navigate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Заполняем formData
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await login(formData);
      navigate('/events');
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
          apiError?.response?.data?.message || 'Произошла ошибка при входе',
        status: apiError?.response?.status || 500,
      });
    }
  };

  return (
    <div className="container">
      <h1 className="title">Аутентификация</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          required
          className="auth-form__input"
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
          className="auth-form__input"
        />
        <button type="submit" className="auth-form__button">
          Войти
        </button>
        <p className="paragraph">
          Нет аккаунта?
          <Link to="/register" className="auth-form__link">
            Создать новый
          </Link>
        </p>
      </form>

      {error && (
        <ErrorNotification
          message={error.message}
          status={error.status}
          onClose={() => setError(null)}
        />
      )}
    </div>
  );
};

export default Login;
