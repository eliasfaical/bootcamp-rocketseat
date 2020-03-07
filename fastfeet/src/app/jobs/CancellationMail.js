import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { order } = data;

    await Mail.sendMail({
      to: `${order.deliveryman.name} <${order.deliveryman.email}>`,
      subject: 'Encomenda cancelada',
      template: 'cancellation',
      context: {
        deliveryman: order.deliveryman.name,
        name: order.recipient.name,
        rua: order.recipient.rua,
        cep: order.recipient.cep,
      },
    });
  }
}

export default new CancellationMail();
