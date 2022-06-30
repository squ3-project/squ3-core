import Display from "./Display";
import KeyboardInput from "./KeyboardInput";

export default class Camera{

    private static goUp:boolean = false
    private static goDown:boolean = false
    private static goRight:boolean = false
    private static goLeft:boolean = false

    private static speed = 2
    private static x:number = 0
    private static y:number = 0


    /**
     * Places camera in specified position (should be Player position [x,y] ) and creates keyHandler
     * for handling w,a,s,d keys (moving camera)
     * @param _x x coordinate
     * @param _y y coordiante
     */
    public static init(_x:number, _y:number){
        const [width, height] = Display.getCanvasDimentions()
        Camera.x = -_x + width/2 - 32/2 
        Camera.y = -_y + height/2 - 32/2
        Camera.keysHandler()
        console.log("Camera setted!")
    }



   /**
     * Handles key info form KeyboardInput, 
     * sets direction of layer movement.
     */
    private static keysHandler():void{
        KeyboardInput.onChangeCamera = () => {
            const keyInfo = KeyboardInput.getKeysState()
            if(keyInfo[1]){
                switch(keyInfo[0]){
                    case "w": 
                        Camera.goUp = true
                        break;
                    case "s":
                        Camera.goDown = true
                        break;
                    case "d":
                        Camera.goRight = true
                        break;
                    case "a":
                        Camera.goLeft = true
                        break;
                    default:
                        break;
                }
            }

            if(!keyInfo[1]){
                switch (keyInfo[0]) {
                    case "w":
                        Camera.goUp = false
                        break;
                    case "s":
                        Camera.goDown = false
                        break;
                    case "d":
                        Camera.goRight = false
                        break;
                    case "a":
                        Camera.goLeft = false
                        break;
                    default:
                        break;
                }
            }
        }
    }

    /**
     * Moves layers is way depended of direction setted in keyHandler
     * Is called in GameLoop on every call of update function (every frame)
     */
    public static moveLayers():void {
        if(Camera.goUp) Camera.y += Camera.speed
        if(Camera.goDown) Camera.y -= Camera.speed
        if(Camera.goRight) Camera.x -= Camera.speed
        if(Camera.goLeft) Camera.x += Camera.speed
    }

    public static collsionMoveX(_speedX:number):void{
        Camera.x -= _speedX
    }

    public static collsionMoveY(_speedY:number):void{
        Camera.y -= _speedY
    }

    public static getSpeed():number{
        return Camera.speed
    }

     /**
     * Return x coordinate of Camera
     * @returns x coordinate
     */
    public static getX():number{
        return Camera.x
    }

     /**
     * Return y coordinate of Camera
     * @returns y coordinate
     */
    public static getY():number{
        return Camera.y
    }

}