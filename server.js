const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const app = require('./app');

const port = process.env.PORT || 8000;
const DB = process.env.DB;

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandeled Exception error 💥 shutting down server....💥');
  process.exit(1);
});


mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true,
  })
  .then(() => {
    console.log('DB connect successfully');
  })
  .catch(() => {
    console.log('DB connection fail');
  });

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`app is now started on port ${port}`);
});

//heroku configuration
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandeled Rejection 💥 shutting down server....💥');
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('Sigtrem recived. Shutting down gracefully 🔆');
  server.close(() => {
    console.log('Process terminated 🙋');
  });
});