import * as Yup from 'yup';

import DeliveryProblem from '../models/DeliveryProblem';
import Order from '../models/Order';

class DeliveryProblemController {
  /**
   * Listar encomenda comproblemas
   */
  async index(req, res) {
    const { page = 1 } = req.query;

    const problem = await DeliveryProblem.findAll({
      order: ['orders_id'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(problem);
  }

  /**
   * Show
   */
  async show(req, res) {
    const { page = 1 } = req.query;

    const problems = await DeliveryProblem.findAll({
      where: {
        orders_id: req.params.id,
      },
      order: ['id'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(problems);
  }

  /**
   * Cadastrando problemas na entrega
   */
  async store(req, res) {
    const schema = Yup.object().shape({
      orders_id: Yup.number(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation falhou' });
    }

    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(400).json({ error: 'Order not found' });
    }

    const orders_id = order.id;

    const { description } = req.body;

    const problem = await DeliveryProblem.create({ orders_id, description });

    return res.json(problem);
  }
}

export default new DeliveryProblemController();
