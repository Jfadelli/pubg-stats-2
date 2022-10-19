const express = require("express");
const router = express.Router();
const db = require('../db/index.js')
const axios = require('axios').default;

const API_KEY = process.env.REACT_APP_API_KEY

const BASE_URL = "https://api.pubg.com/shards/steam/"

const PubgApiConfig = {
    headers: {
        Accept: "application/vnd.api+json",
        Authorization: API_KEY
    }
}

const defaultOptions = {
    gameMode: {
        curr: "gameMode/squad-fpp/",
        squads: "gameMode/squad-fpp/",
        duos: 'gameMode/duos-fpp/'
    },
    teamSize: 0,
    season: "seasons/division.bro.official.pc-2018-14/"
}

//Get all players
router.get("/", async (req, res) => {
    try {
        const playersData = await db.query('select * from  players')
        res.status(200).json({
            status: 'success',
            results: playersData.rows.length,
            data: {
                playersData: playersData.rows
            }
        })
    }
    catch (err) { console.log(err) }
})

//Get one player by name

router.get("/:name", async (req, res) => {
    try {
        const playerData = await db.query('SELECT * FROM players where name = $1', [req.params.name])
        console.log(playerData.rows[0].name)
        // run if name is in db
        console.log('name in db')
        res.status(200).json({
            status: 'success',
            results: playerData.rows.length,
            data: {
                playerData: playerData.rows
            }
        })
        console.log('success')
    }

    // run if name is not in db
    catch {
        try {
            console.log('name not in db')
            typeof (req.params.name)
            const ApiRequest = BASE_URL + defaultOptions.season + defaultOptions.gameMode.squads + "players?filter[playerNames]=" + req.params.name

            console.log(ApiRequest)
            await axios.get(ApiRequest, PubgApiConfig)
                .then(res => {
                    console.log(res)
                })



        } catch (err) {
            console.log(err,)
        }


    }
})

router.get("/test/:name", async (req, res) => {
    try {
        const playerData = await db.query('SELECT * FROM players where name = $1', [req.params.name])
        const ApiRequest = BASE_URL + "players?filter[playerNames]=" + req.params.name
        await axios.get(ApiRequest, PubgApiConfig)
            .then(res => {
                console.log(res.data.data[0].id)
                db.query('INSERT INTO players (id, name, adr) values ($1, $2, 0) returning *', [res.data.data[0].id, req.params.name])
            })

    } catch (err) {
        console.log(err,)

    }
})



module.exports = router