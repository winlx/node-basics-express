const express = require('express');
const morgan = require('morgan');
const todos = require('./todos');

const app = express();

app.set('view engine', 'pug');

app.use(morgan('dev'));

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Express Todo',
    todos,
  });
});

app.get('/todos', (req, res) => {
  if (req.query.completed) {
    return res.json(todos.filter(todo => todo.completed.toString() === req.query.completed));
  }

  return res.json(todos);
});

app.get('/todos/:id', (req, res) => {
  let todo = todos.find(item => item.id === +req.params.id);

  if (!todo) return res.status(404).send('Not found');

  return res.json(todo);
});

app.listen(8000, () => console.log('Server is running on port 8000'));
