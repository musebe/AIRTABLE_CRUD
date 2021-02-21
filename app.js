const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { table } = require('./utils/airtable');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// CREATE A RECORD (CREATE)
app.post('/create', async (req, res) => {
  await table.create(
    {
      Name: 'Tarry Liam',
      Email: 'test@gmail.com',
      Country: 'Netherlands',
    },
    (err, record) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(record.getId());
      return  res.json(record);   
    }
  );
});

// GET ALL RECORDS (READ)
app.get('/all', async (req, res) => {
  const records = await table.select({}).firstPage();
  console.log(records);
  return  res.json(records);
});

// GET A SINGLE RECORD
app.get('/single', async(req, res) => {
    const id = 'recfxOuAfg2tWAJRg';
    table.find(id, (err, record) => {
      if (err) {
        console.error(err);
        return;
      }
      /* here we have the record object we can inspect */
      console.log(record);
      return res.json(records);
    });
});



//UPDATE RECORDS
app.patch('/update', async(req, res) => {
const id = 'recfxOuAfg2tWAJRg';
await table.update(
  id,
  {
    username: 'John',
  },
  (err, record) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(record.get('username'));
    return res.json(record.get('username'));

  }
);
});

// DELETE A RECORD
app.delete('/delete', async(req, res) => {
const id = 'rectHNeBP4u36mL6m';
    await table.destroy(id, (err, record) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Deleted record');
      return res.json('Deleted Record');
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
