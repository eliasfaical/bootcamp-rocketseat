import { Op } from 'sequelize';
import * as Yup from 'yup';

import Order from '../models/Order';
import DeliveryMan from '../models/DeliveryMan';
import Destinatarios from '../models/Destinatarios';
import File from '../models/File';

class DeliveryManEndController {
  /**
   * Listando encomendas com data final
   */

  async index(req, res) {
    const { page = 1 } = req.query;

    const order = await Order.findAll({
      where: {
        [Op.not]: { end_date: null },
      },
      order: ['id'],
      attributes: ['id', 'product', 'start_date', 'end_date'],
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
   * Atualizando encomendas com a data final
   */

  async update(req, res) {
    const shcema = Yup.object().shape({
      signature_id: Yup.number().required(),
    });

    if (!(await shcema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validação de assintura falhou!' });
    }

    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(400).json({ error: 'Encomenda não encontrada' });
    }

    if (order.start_date == null) {
      return res.status(400).json({ error: 'Encomenda não inicada' });
    }

    if (order.end_date != null) {
      return res.status(400).json({ error: 'Encomenda já foi entregue' });
    }

    order.end_date = new Date();
    order.signature_id = req.body.signature_id;

    await order.save();

    return res.json(order);
  }
}

export default new DeliveryManEndController();
