import { Op } from 'sequelize';
import { Event, IEventData, ICurrentUser, IEventUpdateResult } from '@models';
import {
  createValidationError,
  createNotFoundError,
  createServerError,
  createForbiddenError,
  CustomError,
} from '@throws';

class EventService {
  async getAllEvents(startDate?: Date, endDate?: Date): Promise<Event[]> {
    try {
      if (startDate && endDate) {
        return await Event.findAll({
          where: { date: { [Op.between]: [startDate, endDate] } },
        });
      } else if (startDate && !endDate) {
        return await Event.findAll({
          where: { date: { [Op.gte]: startDate } },
        });
      } else if (!startDate && endDate) {
        return await Event.findAll({
          where: { date: { [Op.lte]: endDate } },
        });
      }
      return await Event.findAll();
    } catch (error) {
      throw createServerError(
        'Ошибка при получении списка мероприятий',
        error as CustomError,
      );
    }
  }

  async getEventById(id: string): Promise<Event> {
    try {
      const event = await Event.findByPk(id);
      if (!event) {
        throw createNotFoundError(`Мероприятие с ID ${id} не найдено`);
      }
      return event;
    } catch (error) {
      throw createServerError(
        `Ошибка при получении мероприятия с ID ${id}`,
        error as CustomError,
      );
    }
  }

  async createEvent(eventData: IEventData): Promise<Event> {
    const { title, description, date, createdBy } = eventData;

    if (!title) {
      throw createValidationError('Необходимо указать название мероприятия');
    }
    if (!createdBy) {
      throw createValidationError('Необходимо указать создателя мероприятия');
    }

    try {
      return await Event.create({ title, description, date, createdBy });
    } catch (error) {
      throw createServerError(
        'Ошибка при создании мероприятия',
        error as CustomError,
      );
    }
  }

  async updateEvent(
    id: string,
    eventData: Partial<IEventData>,
    user: ICurrentUser,
  ): Promise<IEventUpdateResult> {
    try {
      const event = await Event.findByPk(id);
      if (!event) {
        throw createNotFoundError(`Мероприятие с ID ${id} не найдено`);
      }

      if (user.role !== 'admin' && event.createdBy !== user.id) {
        throw createForbiddenError(
          'У вас нет прав для редактирования этого мероприятия',
        );
      }

      const oldEvent = { ...event.toJSON() };
      const updatedEvent = await event.update(eventData);

      return {
        current: updatedEvent,
        previous: oldEvent,
      };
    } catch (error) {
      throw createServerError(
        `Ошибка при обновлении мероприятия с ID ${id}`,
        error as CustomError,
      );
    }
  }

  async deleteEvent(id: string, user: ICurrentUser): Promise<boolean> {
    try {
      const event = await Event.findByPk(id);
      if (!event) {
        throw createNotFoundError(`Мероприятие с ID ${id} не найдено`);
      }

      if (user.role !== 'admin' && event.createdBy !== user.id) {
        throw createForbiddenError(
          'У вас нет прав для удаления этого мероприятия',
        );
      }

      await event.destroy();
      return true;
    } catch (error) {
      throw createServerError(
        `Ошибка при удалении мероприятия с ID ${id}`,
        error as CustomError,
      );
    }
  }
}

export default new EventService();
