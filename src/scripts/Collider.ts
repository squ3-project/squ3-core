import Camera from "./Camera"
import Collision from "./Collision"
import Rectangle from "./types/Rectangle";

export default class Collider{
    private blockSize:number = Collision.getBlockSize()
    private border:Rectangle
    private speed:number = Camera.getSpeed()

    constructor(_x:number, _y:number, _width:number, _height:number){
        this.border = {x: _x*this.blockSize, y: _y*this.blockSize, width: _width, height: _height}
    }

    public check(_playerX:number, _playerY:number):[boolean, number, number]{
        const collRect:Rectangle = {
            x: _playerX - this.speed,
            y: _playerY,
            width: this.blockSize + this.speed,
            height: this.blockSize
        }

        const speedY:number = Math.sign(collRect.y - this.border.y) * this.speed
        const speedX:number = Math.sign(collRect.x - this.border.x) * this.speed

        if(Collision.isCollide(collRect, this.border)){
            // console.log("collision!")
        }

        if(Collision.isCollide(collRect, this.border) && (_playerY > (this.border.y - 25)) && (_playerY < (this.border.y + 25))){
            Camera.collsionMoveX(speedX)
            return [true, speedX, 0]
        }

        if(Collision.isCollide(collRect, this.border) && ((_playerY< (this.border.y - 25 )) || (_playerY > (this.border.y + 25)))){
            Camera.collsionMoveY(speedY)
            return [true, 0, speedY]
        }

        return [false, 0, 0]
    }
}

