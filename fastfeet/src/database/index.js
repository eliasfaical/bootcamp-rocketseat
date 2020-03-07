import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/Users';
import Destinatarios from '../app/models/Destinatarios';
import DeliveryMan from '../app/models/DeliveryMan';
import DeliveryProblem from '../app/models/DeliveryProblem';
import File from '../app/models/File';
import Order from '../app/models/Order';

import databaseConfig from '../config/database';

const models = [User, Destinatarios, File, DeliveryMan, DeliveryProblem, Order];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }

  mongo() {
    this.mongoConection = mongoose.connect(
      'mongodb://localhost:27017/fastfeet',
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
  }
}

export default new Database();
