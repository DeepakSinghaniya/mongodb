const express = require("express");
const mongoose = require("mongoose");

const dbURL = "mongodb://localhost/productDB";

const app = express();

mongoose.connect(dbURL, { useNewUrlParser: true });
const connectionObject = mongoose.connection;

connectionObject.on("open", () => {
  console.log("connected.......");
});

app.use(express.json());
const productRouter = require("./routers/products");
app.use("/products", productRouter);

app.listen(2000, () => {
  console.log("server running on 2000 port");
});
