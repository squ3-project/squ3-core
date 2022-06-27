import Atlas from "../utils/Atlas";
import TextureLayer from "./TextureLayer";

export default class TestLayer extends TextureLayer{
    
    protected updates: boolean = false
    protected movesWithCamera: boolean = true
    private x:number = 0
    private y:number = 0
    

    
    constructor(_atlas:Atlas){
        super(_atlas)
        this.drawBlock(1, 32, 32)
        this.drawBlock(1, 160, 160)
    }

    


    public update(): void {
        // do nothing
        
        
        
    }
}