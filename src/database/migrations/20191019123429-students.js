
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('students', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    idade: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    peso: {
      type: Sequelize.INTEGER,
    },
    altura: {
      type: Sequelize.INTEGER,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable('students');
  },
};
