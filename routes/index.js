var express = require('express');
const { getScores } = require('../helpers/fn');
var router = express.Router();

router.post('/get-winner', function (req, res) {
  const { data } = req.body;
  let winner = {};
  let topScore = 0;
  for (let i = 0; i < data.length; i++) {
    const { dicePattern } = data[i];
    const score = getScores(dicePattern);
    if (topScore < score) {
      topScore = score;
      winner = { ...data[i] };
    }
  }
  res.status(200).json({ data: winner });
});

module.exports = router;
