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
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
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

    #setCanvasSize(canvas) {
        canvas.height = this.map.length * this.tileSize;
        canvas.width = this.map[0].length * this.tileSize;
    }
}