const express = require('express')
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

var cors = require('cors')
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;



// middleware
app.use(cors())
app.use(express.json());


app.get('/', (req, res) => {
    res.send('my new assignment 11 has come')
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.y9cyf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        // console.log("connected");
        const database = client.db("tripAdvisor");
        const servicesCollection = database.collection("services");


        // // GET API
        // app.get('/services', async (req, res) => {
        //     const cursor = servicesCollection.find({});
        //     const services = await cursor.toArray();
        //     res.send(services)
        // })


        // // GET SINGLE SERVICE
        // app.get('/services/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const service = await servicesCollection.findOne(query);
        //     console.log('load user with id:', id);
        //     res.json(service)
        // })



        // // POST API
        // app.post('/services', async (req, res) => {
        //     const service = req.body;
        //     console.log("hit the post api");
        //     const result = await servicesCollection.insertOne(service);
        //     console.log(result);
        //     res.json(result)
        // })


        // // DELETE API
        // app.delete('/services/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const result = await servicesCollection.deleteOne(query);
        //     console.log('deleting user id', result);
        //     res.json(result);
        // })

    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);