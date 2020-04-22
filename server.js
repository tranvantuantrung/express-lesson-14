const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const booksRoute = require("./routes/books.route.js");
const usersRoute = require("./routes/users.route.js");
const transactionRoute = require("./routes/transaction.route.js");

const cookieMiddleware = require("./middleware/cookie.middleware.js");

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static("public"));

app.use(cookieMiddleware);

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/books", booksRoute);
app.use("/users", usersRoute);
app.use("/transactions", transactionRoute);

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
