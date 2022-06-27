import { copySync } from "typedoc/dist/lib/utils"
import GameLoop from "../GameLoop"
import KeyboardInput from "../KeyboardInput"
import Layer from "../Layer"

export default class Player extends Layer{

    protected updates: boolean = true
    private goUp:boolean = false
    private goDown:boolean = false
    private goLeft:boolean = false
    private goRight:boolean = false
    private speed:number = 2
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
        KeyboardInput.onChange = () => {
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
     * [DEPRECATED]
     * Listens for w,a,s,d keys and sets direction of movement and spritesheet source y
     * On "keydown" event, gives a sign to start animation 
     */
    private keyListeners():void{
        document.addEventListener("keydown", (e:KeyboardEvent) => {
            switch (e.key) {
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

            
        })

        document.addEventListener("keyup", (e:KeyboardEvent) => {
            switch (e.key) {
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
        })

    }

    /**
     * Handles animation (changing sx on choosed frames (0, 20, 40))
     */
    private animation():void{
        const accualFrame = GameLoop.getFrame()
        switch (accualFrame) {
            case 0:
                this.sx = 0
                break;
            case 20:
                this.sx = 32
                break;
            case 40:
                this.sx = 64
                break;
        
            default:
                break;
        }
        
    }

    public update():void{
        this.clear()
        if(this.goUp) this.y -= this.speed
        if(this.goDown) this.y += this.speed
        if(this.goLeft) this.x -= this.speed
        if(this.goRight) this.x += this.speed

        if(this.animating) this.animation()
        

        this.ctx.drawImage(this.playerSpritesheetImg, this.sx, this.sy, 32, 32, this.x, this.y, 32, 32)

        // this.drawBlock(4, this.x, this.y)
    }

}