import Destinatarios from '../models/Destinatarios';

class DestinatarioController {
  async store(req, res) {
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
