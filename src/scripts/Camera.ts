import KeyboardInput from "./KeyboardInput";
import TextureLayer from "./layers/TextureLayer";

export default class Camera{

    private goUp:boolean = false
    private goDown:boolean = false
    private goRight:boolean = false
    private goLeft:boolean = false

    private x:number = 0
    private y:number = 0


    constructor(){
        console.log("Camera created!")
        this.keysHandler()
    }



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

    public moveLayers():void {
        if(this.goUp) this.y += 2
        if(this.goDown) this.y -= 2
        if(this.goRight) this.x -= 2
        if(this.goLeft) this.x += 2
    }

    public getX():number{
        return this.x
    }

    public getY():number{
        return this.y
    }

}