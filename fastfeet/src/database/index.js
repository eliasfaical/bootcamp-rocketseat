import Sequelize from 'sequelize';

import User from '../app/models/Users';
import Destinatarios from '../app/models/Destinatarios';
import DeliveryMan from '../app/models/DeliveryMan';
import File from '../app/models/File';
import Order from '../app/models/Order';

import databaseConfig from '../config/database';

const models = [User, Destinatarios, File, DeliveryMan, Order];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
