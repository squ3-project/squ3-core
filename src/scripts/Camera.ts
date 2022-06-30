import KeyboardInput from "./KeyboardInput";

export default class Camera{

    private goUp:boolean = false
    private goDown:boolean = false
    private goRight:boolean = false
    private goLeft:boolean = false

    private x:number = 0
    private y:number = 0


    /**
     * Places camera in specified position (should be Player position [x,y] ) and creates keyHandler
     * for handling w,a,s,d keys (moving camera)
     * @param _x x coordinate
     * @param _y y coordiante
     */
    constructor(_x:number, _y:number){
        console.log("Camera created!")
        // inital position of camera
        this.x = _x + 352/2 - 32/2 
        this.y = _y + 352/2 - 32/2
        this.keysHandler()
    }



   /**
     * Handles key info form KeyboardInput, 
     * sets direction of layer movement.
     */
    private keysHandler():void{
        KeyboardInput.onChangeCamera = () => {
            const keyInfo = KeyboardInput.getKeysState()
            if(keyInfo[1]){
                switch(keyInfo[0]){
                    case "w": 
                        this.goUp = true
                        break;
                    case "s":
                        this.goDown = true
                        break;
                    case "d":
                        this.goRight = true
                        break;
                    case "a":
                        this.goLeft = true
                        break;
                    default:
                        break;
                }
            }

            if(!keyInfo[1]){
                switch (keyInfo[0]) {
                    case "w":
                        this.goUp = false
                        break;
                    case "s":
                        this.goDown = false
                        break;
                    case "d":
                        this.goRight = false
                        break;
                    case "a":
                        this.goLeft = false
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
    public moveLayers():void {
        if(this.goUp) this.y += 2
        if(this.goDown) this.y -= 2
        if(this.goRight) this.x -= 2
        if(this.goLeft) this.x += 2
    }

     /**
     * Return x coordinate of Camera
     * @returns x coordinate
     */
    public getX():number{
        return this.x
    }

     /**
     * Return y coordinate of Camera
     * @returns y coordinate
     */
    public getY():number{
        return this.y
    }

}