/**
 * (Singleton) - Interface for canvas element from HTML DOM.
 */
export default class Display{
    private static canvas = document.querySelector('#canvas') as HTMLCanvasElement
    private static ctx = Display.canvas.getContext("2d") as CanvasRenderingContext2D

    private constructor(){}

    /**
     * Sets HTML Canvas size
     * @param _width new width
     * @param _height  new height 
     */
    public static resize(_width:number, _height:number):void{
        Display.canvas.width = _width
        Display.canvas.height = _height
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