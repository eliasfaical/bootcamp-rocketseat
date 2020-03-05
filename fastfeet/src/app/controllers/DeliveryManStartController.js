import { startOfDay, endOfDay, addHours } from 'date-fns';
import { Op } from 'sequelize';

import Order from '../models/Order';
import DeliveryMan from '../models/DeliveryMan';
import Destinatarios from '../models/Destinatarios';
import File from '../models/File';

class DeliveryManStartController {
  /**
   * Listar encomendas iniciadas
   */
  async index(req, res) {
    const { page = 1 } = req.query;

    const order = await Order.findAll({
      where: {
        [Op.not]: { start_date: null },
        end_date: null,
        canceled_at: null,
      },
      attributes: ['id', 'product'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: DeliveryMan,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
        {
          model: Destinatarios,
          as: 'recipient',
          attributes: [
            'name',
            'rua',
            'numero',
            'complemento',
            'estado',
            'cidade',
            'cep',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['url', 'path'],
        },
      ],
    });

    return res.json(order);
  }

  /**
   * Atualiza hora de inicio da entrega de encomenda
   */
  async update(req, res) {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(400).json({ error: 'Encomenda não encontrada' });
    }

    if (order.start_date !== null) {
      return res.status(400).json({
        error: 'Entrega iniciada',
      });
    }

    const startDate = new Date();

    /**
     * Validação para permitir apenas 5 retiradas por dia
     */

    const { count } = await Order.findAndCountAll({
      where: {
        deliveryman_id: order.deliveryman_id,
        start_date: {
          [Op.between]: [startOfDay(startDate), endOfDay(startDate)],
        },
      },
    });

    if (count > 4) {
      return res
        .status(401)
        .json({ error: 'Limite de entregas diária já foi realizado' });
    }

    /**
     * Validação de horário de retiradas, deve ser entre as 08:00 e 18:00h
     */

    const startHour = addHours(startOfDay(startDate), 8);
    const endHour = addHours(startOfDay(startDate), 18);

    if (startDate < startHour) {
      return res
        .status(401)
        .json({ error: 'O horário de entrega começa às 8h00' });
    }

    if (startDate > endHour) {
      return res.status(401).json({
        error: 'Não é permitido entregas após 18h00',
      });
    }

    order.start_date = startDate;

    await order.save();

    return res.json(order);
  }
}

export default new DeliveryManStartController();
