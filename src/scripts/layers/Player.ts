import Camera from "../Camera"
import Collider from "../Collider"
import Collision from "../Collision"
import GameLoop from "../GameLoop"
import KeyboardInput from "../KeyboardInput"
import Layer from "../Layer"

export default class Player extends Layer{

    protected updates: boolean = true
    protected movesWithCamera: boolean = false
    private goUp:boolean = false
    private goDown:boolean = false
    private goLeft:boolean = false
    private goRight:boolean = false

    private collision?:Collision
 
    private x:number = 0
    private y:number = 0


    private playerSpritesheetImg:HTMLImageElement
    private animating:boolean = false

    // source x, y (playerSpriteSheetImg)
    private sy:number = 0
    private sx:number = 0
    


    /**
     * Creates a local player with given spritesheet
     * @param _playerSpritesheetImg spritesheet of player where one frame is 32x32 px and image has 96x128 px
     */
    constructor(_playerSpritesheetImg:HTMLImageElement){
        super()
        this.playerSpritesheetImg = _playerSpritesheetImg
        // this.keyListeners()
        this.keysHandler()
    }


    /**
     * Handles key info form KeyboardInput, 
     * sets direction of movement and spritesheet source y.
     * Starts animation if KeyboardInput.getKeysState()[1] is true
     */
    private keysHandler():void{
        KeyboardInput.onChangePlayer = () => {
            const keyInfo = KeyboardInput.getKeysState()
            if(keyInfo[1]){
                switch(keyInfo[0]){
                    case "w":
                        if(!this.animating) this.animating = true
                        this.goUp = true
                        this.sy = 96
                        break;
                    case "s":
                        if(!this.animating) this.animating = true
                        this.goDown = true
                        this.sy = 0
                        break;
                    case "d":
                        if(!this.animating) this.animating = true
                        this.goRight = true
                        this.sy = 64
                        break;
                    case "a":
                        if(!this.animating) this.animating = true
                        this.goLeft = true
                        this.sy = 32
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
                this.animating = false
                this.sy = 0
                this.sx = 32
            }

        }
    }

    /**
     * Handles animation (changing sx on choosed frames (0, 20, 40))
     */
    private animation():void{
        const accualFrame = GameLoop.getFrame()
        switch (accualFrame) {
            case 0:
                this.sx = 32
                break;
            case 20:
                this.sx = 64
                break;
            case 40:
                this.sx = 0
                break;
        
            default:
                break;
        }
        
    }


    public addCollision(_collision:Collision){
        this.collision = _collision
    }

    /**
     * Returns x coordinate of Player
     * @returns x coordinate
     */
    public getX():number{
        return this.x
    }

     /**
     * Returns y coordinate of Player
     * @returns y coordinate
     */
    public getY():number{
        return this.y
    }

    /**
     * Return 
     * @returns [x coordinate, y coordinate]
     */
    public getPosition():[number, number]{
        return [this.x, this.y]
    }

    /**
     * Changes Player's position in way depended of direction setted in keyHandler function
     * Draws Player spritesheet on virtual canvas
     * Is executed on every animation frame
     */
    public update():void{
        this.clear()

        this.collision?.getColliders().forEach((collider:Collider) => {
            const move = collider.check(this.x, this.y)
            if(move[0]){
                this.x += move[1]
                this.y += move[2]
            }
        })

        if(this.goUp) this.y -= Camera.getSpeed()
        if(this.goDown) this.y += Camera.getSpeed()
        if(this.goLeft) this.x -= Camera.getSpeed()
        if(this.goRight) this.x += Camera.getSpeed()

        if(this.animating) this.animation()
        

        // for camera stuff
        this.ctx.drawImage(this.playerSpritesheetImg, this.sx, this.sy, 32, 32, 160, 160, 32, 32)
        // old solution
        // this.ctx.drawImage(this.playerSpritesheetImg, this.sx, this.sy, 32, 32, this.x, this.y, 32, 32)

        
    }

}