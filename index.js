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
        const database = client.db("tripAdvisor");
        const servicesCollection = database.collection("services");
        const addedCollection = database.collection("allService")
        const ordersCollection = database.collection("orders")

        // console.log("mongo connect succesfully");


        // GET API
        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services)
        })


        // GET INSERTED DATA
        app.get('/addService', async (req, res) => {
            const cursor = addedCollection.find({});
            const services = await cursor.toArray();
            res.send(services)
        })


        // // GET SINGLE SERVICE
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await servicesCollection.findOne(query);
            console.log('load user with id:', id);
            res.json(service)
        })



        //  POST / INSERT API
        app.post('/addService', async (req, res) => {
            const packageDetails = req.body;
            console.log('hit the post api', packageDetails);
            const result = await addedCollection.insertOne(packageDetails);
            console.log(result);
            res.json(result);

        })


        //add order in database
        app.post("/manageOrders", (req, res) => {
            ordersCollection.insertOne(req.body).then((result) => {
                res.send(result);
            });
        });


        // get all order by email query only for me
        app.get("/myOrders/:email", (req, res) => {
            console.log(req.params);
            ordersCollection
                .find({ email: req.params.email })
                .toArray((err, results) => {
                    res.send(results);
                });
        });

        // get all orders for all public
        app.get('/manageOrders', async (req, res) => {
            const cursor = ordersCollection.find({});
            const orders = await cursor.toArray();
            res.send(orders);
        })


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