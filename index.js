const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

//  middleware 
app.use(cors());
app.use(express.json());


console.log(process.env.DC_PASS);


const uri = `mongodb+srv://${process.env.DC_USER}:${process.env.DC_PASS}@cluster0.kckbgvo.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();



    const serviceCollection = client.db("dentalCare").collection('services');
    const doctorCollection = client.db("dentalCare").collection('doctors');
    const blogCollection = client.db("dentalCare").collection('blogs');
    const priceingCollection = client.db("dentalCare").collection('priceing');
    const testimonialsCollection = client.db("dentalCare").collection('testimonials');
    const productsCollection = client.db("dentalCare").collection('products');
    const adminDashboardCollection = client.db("dentalCare").collection('admin-users');
    const adminDoctorsCollection = client.db("dentalCare").collection('admin-doctors');
    const adminAppointmentsCollection = client.db("dentalCare").collection('admin-appointments');
    const adminOrdersCollection = client.db("dentalCare").collection('admin-orders');




    // Service releted apis 
    app.get('/services', async (req, res) => {
      const cursor = serviceCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })



    // Doctors releted apis
    app.get('/doctors', async (req, res) => {
      const cursor = doctorCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })



    // Blogs releted apis
    app.get('/blogs', async (req, res) => {
      const cursor = blogCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })



    // priceing releted apis
    app.get('/priceing', async (req, res) => {
      const cursor = priceingCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })



    // Testimonials releted apis
    app.get('/testimonials', async (req, res) => {
      const cursor = testimonialsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })



    // products releted apis
    app.get('/products', async (req, res) => {
      const cursor = productsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })


    // Admmin Dashboard User releted apis
    app.get('/admin-users', async (req, res) => {
      const cursor = adminDashboardCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.post('/admin-users', async (req, res) => {
      const user = req.body;

      const result = await adminDashboardCollection.insertOne(user);

      res.send(result);
    });

    app.patch('/admin-users/:id', async (req, res) => {
      const id = req.params.id;
      const { role } = req.body;

      const filter = { _id: new ObjectId(id), };

      const updateDoc = {
        $set: {
          role: role
        }
      };

      const result = await adminDashboardCollection.updateOne(
        filter,
        updateDoc
      );

      res.send(result);
    });


    app.delete('/admin-users/:id', async (req, res) => {
      const id = req.params.id;

      const query = {
        _id: new ObjectId(id),
      };

      const result = await adminDashboardCollection.deleteOne(query);

      res.send(result);
    });




    // Admmin Doctor releted apis
    app.get('/admin-doctors', async (req, res) => {
      const cursor = adminDoctorsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    // app.post("/admin-doctors", async (req, res) => {
    //   const doctor = req.body;

    //   const result = await adminDoctorsCollection.insertOne(doctor);

    //   res.send(result);
    // });


    app.patch("/admin-doctors/:id", async (req, res) => {
      const id = req.params.id;
      const updatedDoctor = req.body;

      const filter = {
        _id: new ObjectId(id),
      };

      const updateDoc = {
        $set: updatedDoctor,
      };

      const result = await adminDoctorsCollection.updateOne(
        filter,
        updateDoc
      );

      res.send(result);
    });


    app.delete("/admin-doctors/:id", async (req, res) => {
      const id = req.params.id;

      const query = {
        _id: new ObjectId(id),
      };

      const result = await adminDoctorsCollection.deleteOne(query);

      res.send(result);
    });



    // Admmin Appointments releted apis
    app.get('/admin-appointments', async (req, res) => {
      const cursor = adminAppointmentsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.patch("/admin-appointments/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const { status } = req.body;

        const query = {
          _id: new ObjectId(id),
        };

        const updateDoc = {
          $set: {
            status: status,
          },
        };

        const result = await adminAppointmentsCollection.updateOne(
          query,
          updateDoc
        );

        res.send(result);
      } catch (error) {
        console.error(error);

        res.status(500).send({
          message: "Failed to update appointment status",
        });
      }
    });



    // Admmin Order releted apis
    app.get('/admin-orders', async (req, res) => {
      const cursor = adminOrdersCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.post("/admin-orders", async (req, res) => {
      const order = req.body;

      const result = await adminOrdersCollection.insertOne(order);

      res.send(result);
    });


    app.patch("/admin-orders/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const { status } = req.body;

        const query = {
          _id: new ObjectId(id),
        };

        const updateDoc = {
          $set: {
            status: status,
          },
        };

        const result = await adminOrdersCollection.updateOne(
          query,
          updateDoc
        );

        res.send(result);
      } catch (error) {
        console.error(error);

        res.status(500).send({
          message: "Failed to update order status",
        });
      }
    });









    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Dental doctor is running')
})

app.listen(port, () => {
  console.log(`Dental Care server is running on port ${port}`);

})