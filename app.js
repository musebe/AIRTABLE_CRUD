const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();




app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('path', (req, res) => {
  return body;
});

app.listen(process.env.PORT || port, () => {
  console.log(`Server started on port`);
});

//npm start, open your browser and run localhost:port
