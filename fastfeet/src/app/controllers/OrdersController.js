import * as Yup from 'yup';
import { parseISO, isAfter } from 'date-fns';

import Order from '../models/Order';

import DeliveryMan from '../models/DeliveryMan';
import Destinatarios from '../models/Destinatarios';
import File from '../models/File';

import Notification from '../schema/Notification';

class OrdersController {
  // Listar
  async index(req, res) {
    const packageOrders = await Order.findAll({
      attributes: ['id', 'product', 'start_date', 'canceled_at', 'end_date'],
      include: [
        {
          model: DeliveryMan,
          as: 'deliveryman',
          attributes: ['id', 'name'],
        },
        {
          model: Destinatarios,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'rua',
            'numero',
            'complemento',
            'estado',
            'cep',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(packageOrders);
  }

  // Cadastrar
  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      product: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { product, recipient_id, deliveryman_id } = req.body;

    // Validação de destinatário
    const recipient = await Destinatarios.findByPk(recipient_id, {
      attributes: ['id', 'rua', 'cep'],
    });

    if (!recipient) {
      return res.status(400).json({
        error: 'Destinatário invalído :id.',
      });
    }

    // Validação de entregador
    const deliveryman = await DeliveryMan.findByPk(deliveryman_id, {
      attributes: ['name', 'email'],
    });

    if (!deliveryman) {
      return res.status(400).json({
        error: 'Entregador invalído :id.',
      });
    }

    const packageOrder = await Order.create({
      product,
      recipient_id,
      deliveryman_id,
    });

    // Notifica o entregador que tem uma nova encomenda cadastrada
    await Notification.create({
      content: `Nova encomenda cadastrada para entrega - Produto: ${product}, Entregador: ${deliveryman.name}, Endereço: ${recipient.rua} - ${recipient.cep}`,
      user: deliveryman_id,
    });

    return res.json(packageOrder);
  }

  // Atualizar
  async update(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      canceled_at: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validação falhou' });
    }

    // checa se a encomenda existe
    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(400).json({ error: 'Encomenda não existe' });
    }

    // checa se destinatário existe
    const { recipient_id, deliveryman_id } = req.body;

    const recipient = await Destinatarios.findByPk(recipient_id);
    if (!recipient) {
      return res.status(400).json({
        error: 'Destinatario não encontrado. id exists?',
      });
    }

    // checa se entregador existe
    const deliveryman = await DeliveryMan.findByPk(deliveryman_id);
    if (!deliveryman) {
      return res.status(400).json({
        error: 'Entregador não encontrado. id exists?',
      });
    }

    const { canceled_at } = req.body;

    const parseDate = parseISO(canceled_at);

    const past = isAfter(new Date(), parseDate);

    if (past) {
      return res.status(401).json({
        error: 'Você não pode canlcear essa data',
      });
    }

    const { product } = await order.update(req.body);

    return res.json({
      id,
      product,
      recipient_id,
      deliveryman_id,
    });
  }

  // Deletar
  async delete(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({
        error: 'Falha na validação',
      });
    }

    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(400).json({ error: 'Encomenda invalída' });
    }

    await order.destroy();
    return res.json({
      message: 'Encomenda deletada com sucesso!',
    });
  }
}

export default new OrdersController();
