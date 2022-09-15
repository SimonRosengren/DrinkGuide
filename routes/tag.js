const express = require("express");
const router = express.Router();
const Tag = require('../models/tag')

router.post('/', async (req, res, next) => {
  const tag = new Tag({ tag: req.body.tag })
  await tag.save()
  res.send(200)
})

router.get('/all', async (req, res, next) => {
  try {
    const tags = await Tag.find()
    res.send(tags)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
