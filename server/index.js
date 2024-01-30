const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const addNewNode = require("./routes/node");
const {
  getConstellation,
  removeConstellation,
} = require("./routes/constellation");

const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
app.use(helmet());
app.disable("x-powered-by");

app.use(cors(corsOptions));
app.use(express.json());

app.post("/node", addNewNode);
app.get("/constellation", getConstellation);
app.delete("/constellation", removeConstellation);

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error running on port ${PORT} 🤦🏻‍♀️`);
  } else {
    console.log(`Server is running on port ${PORT} ✨`);
  }
});
