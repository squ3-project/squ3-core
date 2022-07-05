import Rectangle from "../types/Rectangle";
import Collider from "./Collider";



export default class Collision{ 
    private static blockSize:number = 32

    private list:Collider[] = []

    constructor(_collisionString:string){
        // this.list.push(new Collider(3, 1, 32, 32))
        // this.list.push(new Collider(3, 2, 32, 32))
        this.loadCollidersFromString(_collisionString)
    }

    private loadCollidersFromString(_collisionString:string){

        const blocksPerRow = Math.sqrt(_collisionString.length)
        for (let i = 0; i < blocksPerRow**2; i++) {
            if(_collisionString.charAt(i) === "1"){
                const y = Math.floor(i/blocksPerRow)
                const x = i - y*blocksPerRow
                
                this.list.push(new Collider(x, y, 32, 32))
            }
        }
    }

    public getColliders():Collider[]{
        return this.list
    }

    public static getBlockSize():number{
        return Collision.blockSize
    }

    public static isCollide(r1:Rectangle, r2:Rectangle){
        if(r1.x >= r2.x + r2.width) return false
        else if (r1.x + r1.width <= r2.x) return false
        else if (r1.y >= r2.y + r2.height) return false
        else if (r1.y + r1.height <= r2.y) return false
        else return true
    }
}