import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Lead extends Model {
    static associate(models) {}
  }
  Lead.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    loanType: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Lead'
  });
  return Lead;
};