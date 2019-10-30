/* eslint-disable linebreak-style */
import Sequelize, { Model } from 'sequelize';

class HelpOrders extends Model {
  static init(sequelize) {
    super.init(
      {
        question: Sequelize.CHAR,
        answer: Sequelize.CHAR,
        answer_at: Sequelize.DATE,
      },
      {
        sequelize,
      },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id' });
  }
}

export default HelpOrders;
