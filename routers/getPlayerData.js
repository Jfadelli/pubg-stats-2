const express = require("express");
const router = express.Router();
const axios = require("axios");

const API_HEADERS = require("../config/API_HEADERS")
const { playerList } = require("../config/playerList")
const { mapTable } = require('../config/mapTable')

const paramsParser = require('./paramsParser');


const params = {
    requestType: "match history",
    playerList: "Slim_Reaper_",
    season: "18",
    gameMode: "squads"
};



const mapNameParser = (apiMapName) => {
    return mapTable[apiMapName]
}

// Get postgame stats of one match
const fullGameReports = []
const getGameStats = async (matchID) => {

    const gameStatsRequest = `https://api.pubg.com/shards/steam/matches/${matchID}`
    const getGameStats = await axios.get(gameStatsRequest, API_HEADERS)
    const currMap = mapNameParser(getGameStats.data.data.attributes.mapName)
    getGameStats.data.included.filter(item => item['type'] == 'participant')
        .forEach(item => {
            var keys = Object.keys(playerList);
            // console.log(keys)
            for (var i = 0; i < keys.length; i++) {
                // console.log(i)
                if (item['attributes']['stats']['name'] == keys[i]) {
                    item['attributes']['mapName'] = currMap
                    fullGameReports.push(item['attributes'])
                }
            }
        }
        )
}

// Get match history of 1 predefined player
router.get("/", async (req, res) => {
    try {
        request = (paramsParser.parse(params))
        console.log(request)
    } catch {
        console.log("bad params")
    }

    try {
        const matchHistory = await axios.get(request, API_HEADERS)
        const data = matchHistory.data.data[0].relationships.matchesSquadFPP;
        const gameIDs = data.data

        for (let item of gameIDs) {
            await getGameStats(item["id"])
        }
        res.status(200).json(fullGameReports)


        // console.log(data)
    } catch (err) {
        console.log(err)
    }

})



module.exports = router