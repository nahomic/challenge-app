const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USER || 'root',
    database: process.env.DB_NAME || 'transactions',
    password: process.env.DB_PASSWORD || 'root',
    dialect: "mysql"
});

class Database {
    constructor(){
        this.sequelize = sequelize;
    }
    
    async testConnection (){
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
          } catch (error) {
            console.error('Unable to connect to the database:', error);
          } 
    }
}

module.exports = { Database }