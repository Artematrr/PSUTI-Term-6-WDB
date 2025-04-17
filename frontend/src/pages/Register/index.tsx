import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../api/authService';
import { ErrorNotification } from '../../components/ErrorNotification';

const Register = () => {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: 'art2',
    email: 'art2@gmail.com',
    password: 'art2123',
  }); // С данными для тестирования
  const navigate = useNavigate();

  const [error, setError] = useState<{
    message: string;
    status: number;
  } | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await register(formData);
      navigate('/login');
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
          'Произошла ошибка при регистрации',
        status: apiError?.response?.status || 500,
      });
    }
  };

  return (
    <div className="container">
      <h1 className="title">Регистрация</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Имя"
          value={formData.name}
          onChange={handleChange}
          autoComplete="name"
          required
          className="auth-form__input"
        />
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
          Зарегистрироваться
        </button>
        <p className="paragraph">
          Уже есть аккаунт?
          <Link to="/login" className="auth-form__link">
            Войти в существующий
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

export default Register;
