import { Op } from 'sequelize';
import { startOfDay, endOfDay, parseISO } from 'date-fns';

import User from '../models/User';
import Appointment from '../models/Appointment';

class ScheduleController {
  /**
   * Listando agendamento do provedor
   */
  async index(req, res) {
    // Verifica se o usuário é um provider
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkUserProvider) {
      return res.status(401).json({ error: 'Este usário não é um provider' });
    }

    const { date } = req.query;
    const parsedDate = parseISO(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      order: ['date'],
    });

    return res.json(appointments);
  }
}

export default new ScheduleController();