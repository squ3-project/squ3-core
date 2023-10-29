import Display from "../Display"

/**
 * Generic T change return type of activate method
 */
export abstract class Interaction<T>{

    private x:number
    private y:number
    private range = 48
    public name = "default"

    /**
     * Creates Interaction object in specified coordinates on map
     * @param _x x-coordinate (blocks, not pixels)
     * @param _y y-coordinate (blocks, not pixels)
     */
    constructor(_x:number, _y:number){
        this.x = _x * Display.getBlockSize()
        this.y = _y * Display.getBlockSize()
    }

    public checkIfInRange(_x:number, _y:number):boolean{
        const distance = Math.sqrt((this.x-_x)**2 + (this.y-_y)**2)
        if(distance < this.range) return true
        return false
    }

    public abstract activate():T

}