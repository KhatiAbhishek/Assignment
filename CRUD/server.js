const express = require("express");
const mongoose = require("mongoose");
const foodRouter = require("./routes/foodRoutes.js");

const app = express();

app.use(express.json());

mongoose.connect(
  "mongodb+srv://khatiabhishek1:<passward>@cluster0.y3me4wt.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);

app.use(foodRouter);

app.listen(3000, () => {
  console.log("Server is running...");
});