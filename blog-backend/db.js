const {Sequelize} = require("sequelize");
// Initialize Sequelize with SQLite
const sequelizeInstance = new Sequelize({
    dialect: 'sqlite',
    storage: './blogs.db'  // Path to your SQLite database file
  });
  

 
module.exports = sequelizeInstance;