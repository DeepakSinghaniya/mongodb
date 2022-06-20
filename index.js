const express = require("express");
const mongoose = require("mongoose");

const productRouter = require("./routers/products");
const userRouter = require("./routers/users");

const app = express();
const dbURL = "mongodb://localhost/productDB";

mongoose.connect(dbURL, { useNewUrlParser: true });
const connectionObject = mongoose.connection;
connectionObject.on("open", () => {
  console.log("Database connected.......");
});

app.use(express.json());
app.use("/products", productRouter);
app.use("/users", userRouter);

app.listen(2000, () => {
  console.log("Server running on 2000 port");
});
