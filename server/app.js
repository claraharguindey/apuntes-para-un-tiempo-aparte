const express = require("express");
const fs = require("fs");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

const saveEpisodes = (data) => {
  const constellationData = JSON.stringify(data);
  fs.writeFileSync("constellation.json", constellationData);
};

const getConstellationData = () => {
  const constellationData = fs.readFileSync("constellation.json");
  return JSON.parse(constellationData);
};

app.post("/node", (req, res) => {
  const constellation = getConstellationData();

  const newNodeData = req.body;
  const id =
    constellation.length === 0
      ? 0
      : constellation[constellation.length - 1].id + 1;
  const newNode = { id, ...newNodeData };

  const maxNodesToSave = 100;
  if (constellation.length === maxNodesToSave) {
    constellation.shift();
  }

  constellation.push(newNode);

  saveEpisodes(constellation);
  res.send({ success: true, msg: "New node added successfully 💅🏾" });
});

app.get("/constellation", (req, res) => {
  const constellation = getConstellationData();
  res.send(constellation);
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error running on port ${PORT} 🤦🏻‍♀️`);
  } else {
    console.log(`Server is running on port ${PORT} ✨`);
  }
});
