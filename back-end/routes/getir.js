const express = require('express');
const router = express.Router();
const Records = require("../models/records");



router.get('/ping', (req, res) => {
  return res.status(200).json('ping success');
})

router.post('/getir',async function(req,res){
  const params = req.body
  console.log(params)
  return res.json(params)
});




  module.exports = router;