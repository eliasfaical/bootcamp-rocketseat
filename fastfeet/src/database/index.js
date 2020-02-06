import Sequelize from 'sequelize';
import User from '../app/models/Users';
import Destinatarios from '../app/models/Destinatarios';
import databaseConfig from '../config/database';

const models = [User, Destinatarios];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
