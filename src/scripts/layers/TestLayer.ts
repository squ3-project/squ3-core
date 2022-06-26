import Atlas from "../utils/Atlas";
import TextureLayer from "./TextureLayer";

export default class TestLayer extends TextureLayer{
    
    protected updates: boolean = true
    private x:number = 0
    private y:number = 0
    

    
    constructor(_atlas:Atlas){
        super(_atlas)
    }

    


    public update(): void {
        this.clear()
        this.x += 1
        this.y += 1

        this.drawBlock(3, this.x, this.y)
        
        
        
    }
}