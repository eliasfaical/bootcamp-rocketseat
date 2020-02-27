import * as Yup from 'yup';

import Order from '../models/Order';
import DeliveryMan from '../models/DeliveryMan';
import Destinatarios from '../models/Destinatarios';
import File from '../models/File';

class OrdersController {
  // Listar
  async index(req, res) {
    const orders = await Order.findAll({
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
          attributes: ['id', 'name'],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(orders);
  }

  // Cadastrar
  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      product: Yup.string(),
      start_date: Yup.date(),
      end_date: Yup.date(),
      canceled_at: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    // const order = await Order.findByPk(req.params.id);

    // if (!order) {
    //   return res.status(400).json({ error: 'Encomanda já foi cadastrada' });
    // }

    const {
      id,
      product,
      recipient_id,
      deliveryman_id,
      signature_id,
    } = await Order.create(req.body);

    return res.json({
      id,
      product,
      recipient_id,
      deliveryman_id,
      signature_id,
    });
  }

  // Atualizar
  async update(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      signature_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validação falhou' });
    }

    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(400).json({ error: 'Encomenda não existe' });
    }

    const {
      id,
      product,
      recipient_id,
      deliveryman_id,
      signature_id,
    } = await order.update(req.body);

    return res.json({
      id,
      product,
      recipient_id,
      deliveryman_id,
      signature_id,
    });
  }

  // Deletar
  async delete(req, res) {
    const order = await Order.findByPk(req.params.id);

    await order.destroy();
    return res.status(200).json({ ok: true });
  }
}

export default new OrdersController();
