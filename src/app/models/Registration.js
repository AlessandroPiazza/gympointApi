/* eslint-disable linebreak-style */
import Sequelize, { Model } from 'sequelize';

class Registration extends Model {
  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id' });
    this.belongsTo(models.Plan, { foreignKey: 'plan_id' });
  }

  static init(sequelize) {
    super.init(
      {
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.DOUBLE,
      },
      {
        sequelize,
      },
    );
    return this;
  }
}

export default Registration;
