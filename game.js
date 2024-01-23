import TileMap from "./TileMap.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const tileSize = 32;


const tileMap = new TileMap(tileSize);

const velocity = 3; // => The user moves one tile at a time 
const user = tileMap.getUser(velocity);

function gameLoop() {
    tileMap.draw(canvas, ctx);
    user.draw(ctx);
}

setInterval(gameLoop, 1000 / 60);