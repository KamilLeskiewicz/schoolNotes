// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const mongoose = require("mongoose");
// const notesApi = require("./data/data.route");
// const cors = require('cors');

// app.use("/", express.static(__dirname + "/public"));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json({ limit: "2mb" }));
// app.use(cookieParser());
// app.use(notesApi);
// app.use(cors());
// const db =
//   // kongoDB
//   "mongodb+srv://admin:admin123@notelist.mwrimr8.mongodb.net/notelist";
// // kongoDB

// mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connection.on("connected", () => {
//   console.log("Connected with database");
// });

// app.get("*", function (req, res) {
//   res.status(301).redirect("/");
// });

// app.listen(process.env.PORT || 8080, () => {
//   console.log(`Server up and running on port ${process.env.PORT || 8080}`);
// });

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const notesApi = require("./data/data.route");
const cors = require("cors");

app.use(cors());

app.use("/", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cookieParser());
app.use(notesApi);

const db = "mongodb+srv://admin:admin123@notelist.mwrimr8.mongodb.net/notelist";

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("connected", () => {
  console.log("Connected with database");
});

// Ustaw nagłówki, aby uniknąć błędu CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Zmień na odpowiedni adres URL Twojej aplikacji React
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("*", function (req, res) {
  res.status(301).redirect("/");
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server up and running on port ${process.env.PORT || 8080}`);
});
