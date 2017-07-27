const express = require ('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
const _ = require('lodash');
//
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/DiveBuddy');
const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send({
    name: 'trit',
    sex: 'yes please'
  });
})

app.listen(`${PORT}`, () => {
  console.log(`****Started on port ${PORT}****`)
});
