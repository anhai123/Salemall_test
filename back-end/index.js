// Import packages
const express = require("express");
const home = require("./routes/home");
const cors = require("cors");
const dbConfig = require("./config/db.config");
const db = require("./models");
const Role = db.role;
const Comments = db.comment;
// Middlewares
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
var corsOptions = {
  // credentials: true, //access-control-allow-credentials:true
  // optionSuccessStatus: 200,
  // methods: ['AAA'],
  methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
};
app.use(cors(corsOptions));
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   res.header("Access-Control-Allow-Methods", "PUT, GET, POST, OPTIONS");
//   next();
// });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let users = [];

// Routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/category.routes")(app);
require("./routes/product.routes")(app);
app.use("/home", home);

// db.mongoose
//   .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Successfully connect to MongoDB.");
//     initial();
//   })
//   .catch((err) => {
//     console.error("Connection error", err);
//     process.exit();
//   });
db.mongoose.set("strictQuery", false);
db.mongoose
  .connect(
    "mongodb+srv://my-restaurant:RSPpaNHXRQjdvpzq@my-restaurant.znkjyyi.mongodb.net/shopping?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });
      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}
const port = process.env.PORT || 9001;
server.listen(port, () => console.log(`Listening to port ${port}`));
