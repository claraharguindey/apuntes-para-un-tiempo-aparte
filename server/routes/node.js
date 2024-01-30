const MAX_NODES_TO_SAVE = 100;
const { getConstellationData, saveConstellationData } = require("./constellation");

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

module.exports = addNewNode;
