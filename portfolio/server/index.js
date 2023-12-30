const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const uploadsRouter = require('./routes/uploads');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/uploads', uploadsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
