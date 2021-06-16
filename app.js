const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const sessions = require('./src/data/sessions.json');

const app = express();
const sessionsRouter = express.Router();
// express lets us leverage the sesion router to build our code

const PORT = process.env.PORT || 3000;
// everything that comes out of env - or just in case we run on 3000
const path = require('path');

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public/')));
// express getting the static files by looking in public directory, if none found it defaults back

const productsRouter = express.Router();
productsRouter.route('/products')
  .get((req, res) => {
    const response = { hello: 'This is my API' };
    res.json(response);
  });
app.use('/api', productsRouter);

app.set('views', './src/views/');
app.set('view engine', 'ejs');

sessionsRouter.route('/')
  .get((req, res) => {
    res.render('sessions', {
      sessions,
    });
  });

sessionsRouter.route('/1')
  .get((req, res) => {
    res.render('hello single session');
  });

app.use('/sessions', sessionsRouter); // routes everything that goes to sessions with that directory

app.get('/', (req, res) => {
  res.render('index', { title: 'Welcome to the Online Store! ', data: [['a', 'b', 'c']] });
});

app.listen(PORT, () => {
  // listens to port in nodemon conifg
  debug(`Running on port ${chalk.green(PORT)}`);
  // embedding template  strings as per node standards
});
