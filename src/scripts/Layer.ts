import Display from "./Display"

/**
 * For creating graphical layer
 */
export default abstract class Layer{
    
    protected canvas:HTMLCanvasElement 
    protected ctx:CanvasRenderingContext2D
    protected abstract updates:boolean
    protected blockSize:number = Display.getBlockSize()
    protected abstract movesWithCamera:boolean

    /**
     * Creates a virtual canvas and refenece to its graphical context
     */
    constructor(){
        this.canvas = document.createElement("canvas") as HTMLCanvasElement
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D
        this.canvas.width = 960 // temp
        this.canvas.height = 960 // temp
        this.ctx.imageSmoothingEnabled = false
    }

    /**
     * Cleans context of virtual canvas
     */
    protected clear():void{
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    /**
     * Returns graphical content of the Layer 
     * @returns layer's canvas
     */
    public getCanvas():HTMLCanvasElement{
        return this.canvas
    }

    
    /**
     * Returns true or false depends if Layer needs updating
     * @returns true if Layer needs updating, false if not
     */
    public isUpdating():boolean{
        return this.updates
    }

    /**
     * Returns true or false depends if Layer moves with camera
     * @returns true if Layer needs to move with camera movement, false if not
     */
    public isMovingWithCamera():boolean{
        return this.movesWithCamera
    }

    /**
     * Changes parameters of any content on the Layer
     */
    public abstract update():void
}