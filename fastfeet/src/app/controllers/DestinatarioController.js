import * as Yup from 'yup';
import { Op } from 'sequelize';
import Destinatarios from '../models/Destinatarios';

class DestinatarioController {
  // Listar destinatários
  async index(req, res) {
    const { recipient } = req.body;

    if (recipient) {
      const recipients = await Destinatarios.findAll({
        where: {
          name: {
            [Op.like]: `{$recipient}`,
          },
        },
      });

      return res.json(recipients);
    }

    const recipients = await Destinatarios.findAll({
      attributes: [
        'id',
        'name',
        'rua',
        'complemento',
        'estado',
        'cidade',
        'cep',
      ],
    });

    return res.json(recipients);
  }

  // Cadstrar
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.string(),
      complemento: Yup.string().required(),
      estado: Yup.string().required(),
      cidade: Yup.string().required(),
      cep: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Validação do destinatário falhou' });
    }

    const {
      id,
      name,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep,
    } = await Destinatarios.create(req.body);

    return res.json({
      id,
      name,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep,
    });
  }

  // Atualização de destinatário
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.number().integer(),
      complemento: Yup.string(),
      estado: Yup.string().required(),
      cidade: Yup.string().required(),
      cep: Yup.number().integer(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Destinatário falhou na validação' });
    }

    const { id } = req.params;
    const recipient = await Destinatarios.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: 'Destinatário não encontrado' });
    }

    const {
      name,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep,
    } = await recipient.update(req.body);

    return res.json({
      name,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep,
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
      return res
        .status(400)
        .json({ error: 'Falha na validação de paramentros' });
    }

    const { id } = req.params;
    const recipient = await Destinatarios.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: 'Destinatário inválido' });
    }

    await recipient.destroy();

    return res.json({
      message: 'Destinatário removido com sucesso!',
    });
  }
}

export default new DestinatarioController();
