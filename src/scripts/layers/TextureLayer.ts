import Layer from "../Layer";
import Atlas from "../utils/Atlas";

/**
 * Layer for placing texture blocks
 */
export default abstract class TextureLayer extends Layer{

    private atlas:Atlas
    
    /**
     * Creates a Layer with textures from given Atlas object
     * @param _atlas 
     */
    constructor(_atlas:Atlas){
        super()
        this.atlas = _atlas
    }

    /**
     * Draws block of given id and x, y coordinates on Layer
     * @param _id id of the block chosen to draw
     * @param _x destination x of the block on Layer
     * @param _y destination y of the block on Layer
     */
    public drawBlock(_id:number, _x:number, _y:number){
        const [sx, sy] = this.atlas.getBlockCoords(_id)
        this.ctx.drawImage(this.atlas.getTexturesImage(), sx, sy, this.atlas.getBlockWidth(), this.atlas.getBlockWidth(), _x, _y, this.blockSize, this.blockSize)
    }
}