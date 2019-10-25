/* eslint-disable linebreak-style */
import Sequelize, { Model } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        idade: Sequelize.NUMBER,
        peso: Sequelize.NUMBER,
        altura: Sequelize.NUMBER,
      },
      {
        sequelize,
      },
    );
    return this;
  }
}

export default Student;
