/**
 * For creating texture collection
 */
export default class Atlas{
    
    private texturesImage:HTMLImageElement 
    private width:number = 256
    private blockWidth:number = 32
    private blocksPerRow:number = 256/32
    private blockId:[number,number][] = []


    /**
     * Creates texture atlas from given image url
     * @param _url 
     */
    constructor(_url:string){
        this.texturesImage = new Image(this.width, this.width)
        this.texturesImage.src = _url
        this.cropForBlocks()
    }

    /**
     * Returns block width on atlas image
     */
    public getBlockWidth():number{
        return this.blockWidth
    }


    /**
     * Returns Promise for image load
     */
    public loadImage():Promise<HTMLImageElement>{
        return new Promise((resolve, reject) => {
            this.texturesImage.onload = () => resolve(this.texturesImage)
        })
    }


    /**
     * Maps block id to coordinates on texturesImage (sx, sy).
     */
    private cropForBlocks():void{
        this.blockId[0] = [-this.blockWidth, -this.blockWidth] // id = 0 is empty (air block) 
        for (let i = 0; i < (this.blocksPerRow)**2; i++) {
            const j = Math.floor(i/this.blocksPerRow)*this.blocksPerRow
            this.blockId[i+1] = [(i-j)*this.blockWidth, j*this.blockWidth]
        }
    }

    /**
     * Returns sx and sy of block with given id
     * @param _id id of choosed block
     * @returns tuple where 0 index is sx of block and index 1 is sy of block 
     */
    public getBlockCoords(_id:number):[number, number]{
        return this.blockId[_id]
    }

    /**
     * Returns image with every texture from atlas (texture atlas)
     * @returns image with texture atlas
     */
    public getTexturesImage():HTMLImageElement{
        return this.texturesImage
    }
}