import { Router, Request, Response, NextFunction } from 'express';
import { createNotFoundError } from '@throws';

const baseRouter: Router = Router();

baseRouter.get('/', (req: Request, res: Response) => {
  res.json({ status: 'success', message: 'Домашняя страница' });
});

baseRouter.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(createNotFoundError(`Несуществующий маршрут ${req.originalUrl}`));
});

export default baseRouter;
