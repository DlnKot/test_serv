const { Sequelize } = require('sequelize');
const PASSWORD = '307021';


const sequelize = new Sequelize('postgres', 'postgres', PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;