module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gympoint',
  define: {
    timestramps: true,
    underscored: true,
    underscoredAll: true,
  },
};
