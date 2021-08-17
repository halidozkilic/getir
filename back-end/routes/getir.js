const express = require('express');
const router = express.Router();
const Records = require("../models/records");


router.get('/ping', (req, res) => {
  return res.status(200).json('ping success');
})

router.post('/getir',async function(req,res){
  const params = req.body
  let records;
  try {
    records = await Records.aggregate([
      {"$project": {
          "key": 1,
          "createdAt":1,
          "totalCounts": {
            "$sum": "$counts"
          }
        }},
      { $match: {
          createdAt :{
            $lte: new Date(params.endDate)  ,
            $gte:new Date(params.startDate) }
        },
      },
    ])
  }catch (e){
    return res.status(201).json({code: 201,msg:"something went wrong",error:e})
  }

  if(!records.length>0){
    return res.status(400).json({code: -1,msg:"data cannot be found with this date range",error:"Data cannot be provided"})
  }

  let results = records.filter(rec => rec.totalCounts<params.maxCount && rec.totalCounts >params.minCount )


  if(!results.length>0){
    return res.status(400).json({code: -1,msg:"data cannot be found with this count range ",error:"Data cannot be provided"})
  }

  return res.status(200).json({code: 0,msg:"Success",records:results})

});


  module.exports = router;