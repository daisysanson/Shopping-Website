const express = require('express');
const path = require('path');

const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');

const PORT = process.env.PORT || 3000;

const app = express();
const sessionsRouter = require('./src/routers/sessionsRouter');
const adminRouter = require('./src/routers/adminRouter');

app.use('/sessions', sessionsRouter); // routes everything that goes to sessions the item that comes afyer sessions is passed ito router function
// express lets us leverage the sesion router to build our code

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public/')));
app.use('/admin', adminRouter);
// everything that comes out of env - or just in case we run on 3000

// express getting the static files by looking in public directory, if none found it defaults back

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.listen(PORT, () => {
  // listens to port in nodemon conifg
  debug(`Running on port ${chalk.green(PORT)}`);
  // embedding template  strings as per node standards
});
