const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const dbConnection = process.env.DB_STRING;
const appPort = 3000;
mongoose.connect(dbConnection,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log('Database connected');
    app.listen(appPort, () => console.log(`Server running on port ${appPort}`));
  })
  .catch((err) => {
    console.log(err);
  });

app.use(authRoute);
app.use(userRoute);
