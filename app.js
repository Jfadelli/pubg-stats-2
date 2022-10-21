require("dotenv").config();
const express = require('express')
const cors = require('cors')
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// routes
const api = express.Router()
const welcomeRouter = require('./routers/welcomeRouter')
const playerRouter = require('./routers/playerRouter')
const errorRouter = require('./routers/errorRouter')
const getPlayerData = require('./routers/getPlayerData')
const getFavorites = require('./routers/getFavorites')

//port & ip
const host = process.env.HOST || "http://localhost"
const port = process.env.PORT || 4000

//routes
app.use('/api/', api)
app.use('/', welcomeRouter)
app.use('/api/players/', playerRouter)
app.use('/api/getplayerdata/', getPlayerData)
app.use('/api/favorites', getFavorites)
app.use(errorRouter.errorRouter);

app.listen(port, ()=>{
    console.log(`\n*** Server listening on ${host}:${port}`)
})