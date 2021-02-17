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
      imgId: 'dev_setups/yvykqrn013wsyp3vq4sm',
      username: 'Bounce',
      likes: 1,
      url:'https://airtable.com/tblppuobIdWWMfUiB/viwzHea6JQzTIcRUF/recHwc6j0PdOyKuUQ',
    },
    (err, record) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(record.getId());
    }
  );
});

// GET ALL RECORDS (READ)
app.get('/all', async (req, res) => {
  const records = await table.select({}).firstPage();
  console.log(records);
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
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
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
    console.log(record.get('username')); //"My car"
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
    });
});
