import { Request, Response, NextFunction } from 'express';
import EventService from '../services/EventService';
import { IEventData, ICurrentUser } from '../models';
import { AuthRequest } from '../middlewares/auth.middleware';

class EventController {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { startDate, endDate } = req.query;
    try {
      const events = await EventService.getAllEvents(
        startDate ? new Date(startDate as string) : undefined,
        endDate ? new Date(endDate as string) : undefined,
      );

      res.status(200).json({
        status: 'success',
        data: events,
      });
    } catch (error) {
      next(error);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const event = await EventService.getEventById(req.params.id);

      res.status(200).json({
        status: 'success',
        data: event,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authReq = req as AuthRequest;
      const eventData: IEventData = {
        ...req.body,
        createdBy: authReq.user?.id,
      };

      const event = await EventService.createEvent(eventData);

      res.status(201).json({
        status: 'success',
        message: 'Мероприятие успешно создано',
        data: event,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authReq = req as AuthRequest;
      const result = await EventService.updateEvent(
        req.params.id,
        req.body,
        authReq.user as ICurrentUser,
      );

      res.status(200).json({
        status: 'success',
        message: 'Мероприятие успешно обновлено',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authReq = req as AuthRequest;
      await EventService.deleteEvent(
        req.params.id,
        authReq.user as ICurrentUser,
      );

      res.status(200).json({
        status: 'success',
        message: 'Мероприятие успешно удалено',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new EventController();
