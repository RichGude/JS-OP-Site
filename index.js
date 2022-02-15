// Load libraries
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const redis = require("redis");
const cors = require("cors");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
let RedisStore = require("connect-redis")(session);

// Define constants
const { MONGO_PASSWORD, MONGO_USER, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require("./config/config");

let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT,
});
// Import routes
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

// IP specified as "mongo" since this is the notation for intercontainer communication (DNS)
const connectWithRetry = () => {
    mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
})
    .then(() => console.log("successfully connected to database"))
    // Generate an authorized user for the 'users' database, if not already initialized
    .then(() => {
        // Utilize a standard username
        const user = await User.findOne({username: "Admin"});
        if (!user) {
            const hashpassword = await bcrypt.hash("techopsrocks", 12);
            const newUser = await User.create({
                username: "Admin",
                password: hashpassword});
        };
    })
    .catch((e) => {
        console.log(e);
        setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

// Ensure that any headers proxies that express (e.g., IP address) adds are enabled
app.enable("trust proxy");
// Enable requests sent from one domain to be processed by another
app.use(cors({}));

app.use(session({
    store: new RedisStore({client: redisClient}),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        // Set token to expire after 30 min
        maxAge: 1800000
    },
}));
// Ensures that the body gets attached to the json (middleware)
app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h2>Hi there</h2>");});

// For all pings to 'localhost:3000/posts' go to postRouter
app.use("/posts", postRouter);
app.use("/users", userRouter);

// If the environment variable port has been set, use that; else, use 3000
const port = process.env.PORT || 3000;

// Activate the app with "node index.js"
app.listen(port, () => console.log(`listening on port ${port}`));