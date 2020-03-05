import DeliveryMan from '../models/DeliveryMan';
import Destinatarios from '../models/Destinatarios';
import Order from '../models/Order';

class DeliveryOrderController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const deliveryman = await DeliveryMan.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliverman não encontrado' });
    }

    const delivery = await Order.findAll({
      where: {
        deliveryman_id: req.params.id,
        canceled_at: null,
        end_date: null,
      },
      attributes: ['id', 'product', 'start_date'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: DeliveryMan,
          as: 'deliveryman',
          attributes: ['name'],
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
      ],
    });

    return res.json(delivery);
  }
}

export default new DeliveryOrderController();
