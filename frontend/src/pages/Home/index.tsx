import styles from './index.module.scss';

const Home = () => {
  return (
    <div className="container">
      <h1 className="title">Домашняя страница</h1>
      <p>
        Это проект для просмотра мероприятий, для добавления и удаления тоже.
      </p>
      <p>
        Без регистрации вы можете просматривать события. Для остального нужно
        зарегистрироваться.
      </p>
      <img src="/favicon.png" alt="Логотип Эвентарно" className={styles.logo} />

    </div>
  );
};

export default Home;
