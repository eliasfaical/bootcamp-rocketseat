import Mail from '../../lib/Mail';

class NewDeliveryMail {
  get key() {
    return 'NewDeliveryMail';
  }

  async handle({ data }) {
    const { deliveryman, recipient, product } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Nova encomenda para entrega',
      template: 'encomenda',
      context: {
        product,
        deliveryman: deliveryman.name,
        name: recipient.name,
        rua: recipient.rua,
        cep: recipient.cep,
      },
    });
  }
}

export default new NewDeliveryMail();
