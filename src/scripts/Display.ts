/**
 * (Singleton) - Interface for canvas element from HTML DOM.
 */
export default class Display{
    private static canvas = document.querySelector('#canvas') as HTMLCanvasElement
    private static ctx = Display.canvas.getContext("2d") as CanvasRenderingContext2D
    private static blockSize = 32

    private constructor(){}

    /**
     * Sets HTML Canvas size
     * @param _width new width
     * @param _height  new height 
     */
    public static resize(_width:number, _height:number):void{
        Display.canvas.style.width = _width * 2 + "px" // width in html
        Display.canvas.style.height = _height * 2 + "px" // height in html
        Display.canvas.width = _width // how much blocks are visible on canvas (how big viewport is). For example 352/32 = 11 blocks. 
        Display.canvas.height = _height // how many blocks are visible on canvas (how big viewport is). For example 352/32 = 11 blocks.  
        Display.ctx.imageSmoothingEnabled = false
    }

    
    /**
     * Retuns canvas dimentions (context dimentions, not HTML height and width)
     * @returns [width, height]
     */
    public static getCanvasDimentions():[number, number]{
        return [Display.canvas.width, Display.canvas.height] 
    }

    public static getBlockSize():number{
        return this.blockSize
    }


    /**
     * Draws the content on HTML Canvas
     * @param _image content to draw
     * @param _dx destination x
     * @param _dy destination y
     */
    public static draw(_image:CanvasImageSource, _dx:number, _dy:number):void{
        Display.ctx.drawImage(_image, _dx, _dy)
    }

    /**
     * Cleans HTML Canvas (removes everything from context)
     */
    public static clear():void{
        Display.ctx.clearRect(0, 0, Display.canvas.width, Display.canvas.height)
    }

}