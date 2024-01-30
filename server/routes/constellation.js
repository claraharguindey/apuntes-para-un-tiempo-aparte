const fs = require("fs");
const CONSTELLATION_FILE_PATH = "constellation.json";

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

module.exports = {
  getConstellationData,
  saveConstellationData,
  getConstellation,
  removeConstellation,
};
