import Display from "./Display";
import Layer from "./Layer";

/**
 * (Singleton) - used for animation and updating properties.
 */
export default class GameLoop{
    
    private static drawQueue:Layer[] = []
    private static updateQueue:Layer[] = []
    private static frames:number = 0

    private constructor(){}


    /**
     * Adds layers to draw and update queue. 
     * Layers should be added in right order
     * (for example: BackgroundLayer goes first, Player goes last)
     * @param layer layer to add
     */
    public static addToQueue(layer:Layer):void{
        if(layer.isUpdating()) this.updateQueue.push(layer)
        this.drawQueue.push(layer)
    }


    /**
     * Starts the game loop
     */
    public static start():void{
        window.onload = (e:Event) => setInterval(GameLoop.loop, 1000/60)
    }

    /**
     * Draws layers in the specified order
     */
    private static draw():void{
        GameLoop.drawQueue.forEach((layer:Layer) => Display.draw(layer.getCanvas(), 0, 0))
    }

    /**
     * Updates layers in the specified order
     */
    private static update():void{
        GameLoop.updateQueue.forEach((layer:Layer) => layer.update())
    }

    /**
     * Updates the frames counter
     */
    private static setFrames():void{
        GameLoop.frames++
        // console.log(GameLoop.frames)
        if(GameLoop.frames === 60) GameLoop.frames = 0
    }

    /**
     * Returns accual frame
     */
    public static getFrame():number{
        return GameLoop.frames
    }

    /**
     * Calls draw and update methods 
     */
    private static loop():void{
        Display.clear()
        GameLoop.update()
        GameLoop.draw()
        GameLoop.setFrames()

    }

}