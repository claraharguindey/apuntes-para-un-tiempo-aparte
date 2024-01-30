const express = require("express");
const fs = require("fs");
const router = express.Router();

const CONSTELLATION_FILE_PATH = "constellation.json";
const MAX_NODES_TO_SAVE = 100;

const saveConstellationData = (data) => {
  const constellationData = JSON.stringify(data);
  fs.writeFileSync(CONSTELLATION_FILE_PATH, constellationData);
};

const getConstellationData = () => {
  const constellationData = fs.readFileSync(CONSTELLATION_FILE_PATH);
  return JSON.parse(constellationData);
};

const getConstellation = (req, res) => {
  const constellation = getConstellationData();
  res.send(constellation);
};

const removeConstellation = (req, res) => {
  fs.writeFileSync(CONSTELLATION_FILE_PATH, "[]");
  res.send({ success: true, msg: "Constellation removed successfully" });
};

const addNewNode = (req, res) => {
  const constellation = getConstellationData();
  const newNodeData = req.body;

  const id =
    constellation.length === 0
      ? 0
      : constellation[constellation.length - 1].id + 1;
  const newNode = { id, ...newNodeData };

  if (constellation.length === MAX_NODES_TO_SAVE) {
    constellation.shift();
  }

  constellation.push(newNode);

  saveConstellationData(constellation);
  res.send({ success: true, msg: "New node added successfully 💅🏾" });
};

router.post("/node", addNewNode);
router.get("/constellation", getConstellation);
router.delete("/constellation", removeConstellation);

module.exports = router;
