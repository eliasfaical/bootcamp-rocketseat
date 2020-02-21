import * as Yup from 'yup';
import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';

class DeliveryManController {
  // Listar
  async index(req, res) {
    const deliverymans = await DeliveryMan.findAll({
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(deliverymans);
  }

  // Cadastrar
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validação de entregador falhou' });
    }

    const deliveryManExists = await DeliveryMan.findOne({
      where: { email: req.body.email },
    });

    if (deliveryManExists) {
      return res.status(400).json({ error: 'Deliveryman já existe' });
    }

    const { id, name, email, avatar_id } = await DeliveryMan.create(req.body);

    return res.json({
      id,
      name,
      email,
      avatar_id,
    });
  }

  // Atualizar
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Validação de atualização falahou' });
    }

    const deliveryman = await DeliveryMan.findByPk(req.params.id);
    const { email } = req.body;

    if (!deliveryman) {
      return res.status(400).json({ error: 'Usuário não existe' });
    }

    if (email && email !== deliveryman.email) {
      const userExists = await DeliveryMan.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({
          err: 'Usuário já existe.',
        });
      }
    }

    const { id, name, avatar_id } = await deliveryman.update(req.body);

    return res.json({
      id,
      name,
      email,
      avatar_id,
    });
  }

  // Deletar
  async delete(req, res) {
    const deliveryman = await DeliveryMan.findByPk(req.params.id);

    await deliveryman.destroy();
    return res.status(200).json({ ok: true });
  }
}

export default new DeliveryManController();
