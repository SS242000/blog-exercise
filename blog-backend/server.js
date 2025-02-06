const express = require('express');
const cors = require('cors');
const sequelizeInstance = require('./db');
const { User, Blog, Comment,BlogView } = require('./dbSchema');
const loginRoutes = require('./Routes/userRoutes');

const app = express();
const port = process.env.PORT || 5001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api', loginRoutes); // Assuming userRoutes are correctly defined

app.listen(port, async () => {
  try {
    
    await sequelizeInstance.authenticate();
    await BlogView.sync({ alter: true });
    console.log('Connection to the database has been established successfully.');

 

    console.log(`App is running on port ${port}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
