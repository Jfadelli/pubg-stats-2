const express = require("express");
const router = express.Router();
const axios = require("axios");

const paramParser = require('./paramsParser')
let params = {
    requestType: "match history",
    playerList: "Slim_Reaper_",
    season: "20",
    gameMode: "squads"
  };

let req = paramParser.parse(params)
console.log(req)

router.get("/", async (req, res) => {
    try {
        res.status(200).json({
            status: 'success',
            results: "test"
        })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router