const express = require("express");
const dotenv = require('dotenv');
dotenv.config();

const db = require('./db');

const authRoute = require('./routes/auth');
const appRoutes = require('./routes/index');

const { httpLogger } = require('./middleware/logger');
const logger = require('./utils/logger');


const app = express();
app.use(express.json());
app.use(httpLogger);
app.use('/auth', authRoute);
app.use('/v1', appRoutes);

app.get("/health", (req, res) => {
  res.send("Server working");
});

const init = async ()=>{
  try{
    await db();
    logger.info('🌟 Connected to MongoDB')
  }catch(err){
    logger.error('❌ MongoDB connection error:', err)
  }

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => logger.info(`🚀 Server running on the port ${PORT}`));
}

init()
