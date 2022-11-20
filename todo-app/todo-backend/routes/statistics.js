const express = require('express');
const { getAsync } = require('../redis');
const { ADD_TODO } = require('../util/const');
const router = express.Router();

/* GET statistics listing. */
router.get('/', async (_, res) => {
  console.log('ADD_TODO', ADD_TODO);
  const todoCount = (await getAsync(ADD_TODO)) || 0;
  res.json({
    [ADD_TODO]: parseInt(todoCount),
  });
});

module.exports = router;
