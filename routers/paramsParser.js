const express = require("express");
const { requestHeaders } = require("../config/API_HEADERS");
const baseUrl = "https://api.pubg.com/shards/steam/";
const { playerList } = require("../config/playerList");
const { seasonList } = require("../config/seasonList");
const { gameModeList } = require("../config/gameModeList");
const { requestTypeList } = require("../config/requestTypeList");
const { trailingOptions } = require("../config/trailingOptions");

let params = {
  requestType: "match history",
  playerList: "Slim_Reaper_",
  season: "20",
  gameMode: "squads"
};

function parse() {
  let request = "";
  if (params == null) {
    return;
  }
  if (params.requestType == "match history") {
    request = request.concat(
      baseUrl,
      seasonList[params.season],
      gameModeList[params.gameMode],
      requestTypeList[params.requestType],
      playerList[params.playerList],
      trailingOptions
    );
    return request
  }
}

module.exports = { parse }