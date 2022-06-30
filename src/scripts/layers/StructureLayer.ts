import Atlas from "../utils/Atlas";
import TextureLayer from "./TextureLayer";

/**
 * Second Layer after Background Layer. Is used for placing other blocks which will stand out from the background.
 * Creating paths, placing flora or building blocks. 
 */
export default class StructureLayer extends TextureLayer{
    protected updates: boolean = false
    protected movesWithCamera: boolean = true

    /**
     * blocksGridString is string where blocks ids are separated by semicolon
     * if there is no block in specified place there is "x"
     * Example: "15;61;1;3;x;x;x;1"
     */
    

    /**
     * Creates Background Layer instance using textures from given atlas
     * and given blocksGridString
     * @param _atlas instance of Atlas class
     * @param _blocksGridString blocks grid in string format
     */
    constructor(_atlas:Atlas, _blocksGridString:string){
        super(_atlas)
        this.placeBlocks(_blocksGridString)
    }

    /**
     * Place blocks on layer's virtual canvas in way depended of given blocksGridString
     * @param _blocksGridString blocks grid in string format
     */
    private placeBlocks(_blocksGridString:string):void{
        const blocksGridArray = _blocksGridString.split(";")
        const blocksPerRow = Math.sqrt(blocksGridArray.length)
        for (let i = 0; i < blocksPerRow**2; i++) {
            const id = parseInt(blocksGridArray[i])
            if(!isNaN(id)){

                const y = Math.floor(i/blocksPerRow)
                const x = i - y*blocksPerRow
                
                this.drawBlock(id, x, y)
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