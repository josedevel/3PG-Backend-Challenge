const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

var connectionString = "mongodb://main_admin:abc123@localhost:27017/dev";

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('dev');
    const booksCollection = db.collection('books');
    //quotesCollection.insertOne({name: 'test1'});

    app.get('/', (req, res) => {
      res.send('3PG Backend Challenge - Book Store Inventory Backend')
      
    });

    app.get('/books', (req, res) => {
        db.collection('books').find().toArray()
          .then(results => {
            console.log(results)
            res.send(results)
          })
          .catch(error => console.error(error))
      })

    app.post('/books', (req, res) => {
      booksCollection.insertOne(req.body)
        .then(result => {
        console.log(result)
        res.json('Success')
      })
      .catch(error => console.error(error))
    })

    app.put('/books', (req, res) => {
      booksCollection.findOneAndUpdate(
        { id: req.body.id },
        {
          $set: {
            author: req.body.author,
            price: req.body.price,
            title: req.body.title
          }
        },
        {
          upsert: true
        }
      )
        .then(result => {
          console.log(result)
          res.json('Success')
        })
        .catch(error => console.error(error))
    })

    app.delete('/books', (req, res) => {
        booksCollection.deleteOne(
          {
            id: req.body.id
         }
        )
        .then(result => {
            /*if (result.deletedCount === 0) {
                return res.json('No quote to delete')
              }*/
            res.json(`Deleted`)
          })
          .catch(error => console.error(error))
      })

  })
  .catch(error => console.error(error));


app.listen('3001', () => { });