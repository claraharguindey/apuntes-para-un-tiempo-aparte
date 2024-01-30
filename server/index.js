const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const constellationRouter = require("./routes/constellation");

const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "../client")));

app.use(helmet());
app.disable("x-powered-by");

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", constellationRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error running on port ${PORT} 🤦🏻‍♀️`);
  } else {
    console.log(`Server is running on port ${PORT} ✨`);
  }
});

app.get("/list", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client", "list.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client", "index.html"));
});

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../client", "404.html"));
// });