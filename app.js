const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRoute = require("./routes/userRoute");
const connectDb = require("./config/dbConnection");

connectDb();

const app = express();

const port = process.env.PORT || 5000;

const corsOption = {
  origin: ["http://localhost:5001", "https://swiftrides.vercel.app/"],
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));

app.use("/api/users", userRoute);

app.all("*", (req, res) => {
  res.status(404);
  throw new Error("route not found");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
