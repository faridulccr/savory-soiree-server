// create an express server
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const { getAllMenu } = require("./controllers/menu.controller");
const { getAllReview } = require("./controllers/review.controller");
const {
    getAllCarts,
    addCart,
    deleteCart,
} = require("./controllers/cart.controller");
const {
    getAllUsers,
    getSingleUser,
    createUser,
    deleteUser,
} = require("./controllers/user.controller");

// create express server
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("views"));

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.DB_URL, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        // await client.connect();
        client.connect();
        // create a collection for menu in SavoryDB
        const menuCollection = client.db("SavoryDB").collection("menu");

        // create a collection for reviews in SavoryDB
        const reviewCollection = client.db("SavoryDB").collection("reviews");

        // create a collection for carts in SavoryDB
        const cartCollection = client.db("SavoryDB").collection("carts");

        // create a collection for users in SavoryDB
        const userCollection = client.db("SavoryDB").collection("users");

        // welcome message
        app.get("/", (req, res) => {
            res.status(200).json({ message: "welcome to server" });
        });

        // Menu related apis
        app.get("/api/menu", getAllMenu(menuCollection));

        // Review related apis
        app.get("/api/reviews", getAllReview(reviewCollection));

        // Cart related apis
        app.post("/api/cart", addCart(cartCollection));
        app.get("/api/carts/:email", getAllCarts(cartCollection));
        app.delete("/api/carts/:id", deleteCart(cartCollection));

        // Users related apis
        app.get("/api/users", getAllUsers(userCollection));
        app.get("/api/users/:email", getSingleUser(userCollection));
        app.post("/api/users", createUser(userCollection));
        app.delete("/api/users/:email", deleteUser(userCollection));

        // // update product
        // app.put("/api/update-product/:id", updateProduct(productsCollection));

        // not found error handling
        app.use((req, res, next) => {
            res.status(404).json({
                message: "Not Found",
            });
        });

        // server error handling
        app.use((err, req, res, next) => {
            console.log(err.stack);
            res.status(500).send("something broke");
        });
        // console.log("connected");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

module.exports = app;
