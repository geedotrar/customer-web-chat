import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init({
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User'
  });
  return User;
};
