const express = require("express");
const router = express.Router();
const axios = require("axios");

const API_HEADERS = require("../config/API_HEADERS")

const paramsParser = require('./paramsParser')

let params = {
    requestType: "match history",
    playerList: "Slim_Reaper_",
    season: "18",
    gameMode: "squads"
  };

let request = paramsParser.parse(params)

router.get("/", async (req, res) => {
    try {
        const res = await axios.get(request, API_HEADERS)
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err.headers)
    }
})

module.exports = router