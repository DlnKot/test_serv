const { Sequelize } = require('sequelize');



const sequelize = new Sequelize('postgres', 'postgres', 'postgres',{
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
});


async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Подклучение успешно!');
    } catch (err) {
        console.log('Не удалось подкулючиться: ',err);
    }
}

testConnection();

module.exports = sequelize;