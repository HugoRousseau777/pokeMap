import User from './User.js';
import MovingDirection from './MovingDirection.js';

export default class TileMap {
    constructor(tileSize){
        this.tileSize = tileSize;
        this.grass = this.#image("unnamed.png");
        this.tallGrass = this.#image("tallGrass.jpeg");
        this.user = this.#image("user.png");
        this.wall = this.#image("brick.webp");
        this.chat = this.#image("chat.jpeg");
    }

    #image(fileName) {
        const img = new Image();
        img.src = `img/${fileName}`;
        return img;
    }

    //0 Grass
    //1 Walls
    //2 Tall Grass
    //3 Ennemies
    //4 User 
    
    map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    draw(canvas, ctx){
        this.#setCanvasSize(canvas);
        this.#clearCanvas(canvas, ctx);
        this.#drawMap(ctx);
    }

    #drawMap(ctx) {
        for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[row].length; column++) {
                const tile = this.map[row][column];
                let image = null;
                switch (tile) {
                    case 0: 
                        image = this.grass;
                        break;
                    case 1:
                        image = this.chat;
                        break;
                    case 2:
                        image = this.tallGrass;
                        break;       
                    case 4:
                        image = this.chat;
                        break;       
                }

                if(image != null)
                    ctx.drawImage(
                        image,
                        column * this.tileSize,
                        row * this.tileSize,
                        this.tileSize,
                        this.tileSize);
            }
        }
    }

    #clearCanvas(canvas, ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    getUser(velocity){
        for(let row=0; row<this.map.length; row++){
            for(let column = 0; column < this.map[row].length; column++){
                let tile = this.map[row][column]; 
                if(tile === 4){
                    this.map[row][column] = 0; // Once user moved, this.map... gets the original background !!! grass + tallGrass for us
                    return new User(
                        column * this.tileSize,
                        row * this.tileSize,
                        this.tileSize,
                        velocity,
                        this)
                        ; // The final this prevents collision
                }
            }
        }
    }
    #setCanvasSize(canvas) {
        canvas.height = this.map.length * this.tileSize;
        canvas.width = this.map[0].length * this.tileSize;
    }

    
    didCollideWithEnv(x,y,direction) { // Ajout Collision
        let column = Math.floor(x/this.tileSize);
        let row = Math.floor(y/this.tileSize);
        let nextRow = 0;
        let nextColumn = 0;

        switch(direction) {
            case MovingDirection.right:
                nextColumn = Math.floor(x + this.tileSize);
                column = Math.floor(nextColumn / this.tileSize);
                row = Math.floor(y / this.tileSize);
                break;
            case MovingDirection.left:
                nextColumn = Math.ceil(x - this.tileSize);
                column = Math.ceil(nextColumn / this.tileSize);
                row = Math.ceil(y / this.tileSize);
                break;
            case MovingDirection.up:
                nextRow = Math.ceil(y - this.tileSize);
                row = Math.ceil(nextRow / this.tileSize);
                column = Math.ceil(x / this.tileSize);
                break;
            case MovingDirection.down:
                nextRow = Math.floor(y + this.tileSize);
                row = Math.floor(nextRow / this.tileSize);
                column = Math.floor(x / this.tileSize);
                break;
        }
        const tile = this.map[row][column];
        if(tile === 1){
            return true;
        }
    return false;
}

    // Ajout rencontre pokemon
    encounter(x,y) { 
        let column = Math.floor(x/this.tileSize);
        let row = Math.floor(y/this.tileSize);

        const tile = this.map[row][column];
        
        if(tile == 2){
            for(let i=0; i<1; i++){
                let random = Math.random() * 100;
                if(random < 30){
                    console.log("Un pokemon sauvage apparaît !");
                }
            }
        }
    }
}