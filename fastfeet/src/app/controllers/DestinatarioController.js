import * as Yup from 'yup';
import Destinatarios from '../models/Destinatarios';

class DestinatarioController {
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
}

export default new DestinatarioController();
