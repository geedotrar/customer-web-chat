import Sequelize from 'sequelize';
import dbConfig from '../config/config.js';
import userModel from './user.js';
import leadModel from './leads.js';

const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = userModel(sequelize, Sequelize.DataTypes);
db.Lead = leadModel(sequelize, Sequelize.DataTypes);

export default db;
