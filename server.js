const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const path = require("path");

dotenv.config();

const app = express();

//middlewaares

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//routes
app.use("/api/v1/user", authRoutes);
app.use("/api/v1/blog", blogRoutes);
//port

const PORT = process.env.PORT || 8080;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(
      `Server running on ${process.env.DEV_MODE} mode port no ${PORT}`.bgCyan
        .white
    );
  });
});
