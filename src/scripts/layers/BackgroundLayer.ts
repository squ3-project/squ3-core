import Atlas from "../utils/Atlas";
import TextureLayer from "./TextureLayer";

/**
 * Layer which is whole filled with specified block
 */
export default class BackgroundLayer extends TextureLayer{
    protected updates: boolean = false
    protected movesWithCamera: boolean = true

    /**
     * Creates a BackgroundLayer with texture from given Atlas object
     * @param _atlas object of Atlas class
     * @param _id id of block from given Atlas to fill Layer
     */
    constructor(_atlas:Atlas, _id:number){
        super(_atlas)        
        this.drawBackground(_id)
    }

    /**
     * Draws the background with block of given id 
     * @param _id block id
     */
    private drawBackground(_id:number){
        for (let i = 0; i < this.canvas.width/this.blockSize; i++) {
            for (let j = 0; j < this.canvas.width/this.blockSize; j++) {
                this.drawBlock(_id, i, j)
            } 
        }
    }

    /**
     * Not implemented
     */
    public update(): void {
        throw new Error("Layer doesn't need to update!");
    }
}