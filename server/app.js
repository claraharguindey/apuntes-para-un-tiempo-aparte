const express = require("express");
const fs = require("fs");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const MAX_NODES_TO_SAVE = 100;
const CONSTELLATION_FILE_PATH = "constellation.json";

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

const saveConstellationData = (data) => {
  const constellationData = JSON.stringify(data);
  fs.writeFileSync(CONSTELLATION_FILE_PATH, constellationData);
};

const getConstellationData = () => {
  const constellationData = fs.readFileSync(CONSTELLATION_FILE_PATH);
  return JSON.parse(constellationData);
};

const addNewNode = (req, res) => {
  const constellation = getConstellationData();
  const newNodeData = req.body;

  const id = (constellation.length === 0) ? 0 : constellation[constellation.length - 1].id + 1;
  const newNode = { id, ...newNodeData };

  if (constellation.length === MAX_NODES_TO_SAVE) {
    constellation.shift();
  }

  constellation.push(newNode);

  saveConstellationData(constellation);
  res.send({ success: true, msg: "New node added successfully 💅🏾" });
};

const getConstellation = (req, res) => {
  const constellation = getConstellationData();
  res.send(constellation);
};

const removeAllNodes = (req, res) => {
  fs.writeFileSync(CONSTELLATION_FILE_PATH, "[]");
  res.send({ success: true, msg: "Constellation removed successfully" });
};

app.post("/node", addNewNode);
app.get("/constellation", getConstellation);
app.delete("/constellation", removeAllNodes);

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error running on port ${PORT} 🤦🏻‍♀️`);
  } else {
    console.log(`Server is running on port ${PORT} ✨`);
  }
});
