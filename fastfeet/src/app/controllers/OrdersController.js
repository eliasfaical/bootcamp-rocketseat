import * as Yup from 'yup';

import Order from '../models/Order';
// import DeliveryMan from '../models/DeliveryMan';
// import Destinatarios from '../models/Destinatarios';
// import File from '../models/File';

class OrdersController {
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

    // const order = await Order.findOne({
    //   where: { id: req.body.id },
    // });

    // if (!order) {
    //   return res.status(400).json({ error: 'Ordem não encontrada' });
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
}

export default new OrdersController();
