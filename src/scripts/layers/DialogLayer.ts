import Layer from "../Layer";
import Interactions from "../actions/Interactions";

export default class DialogLayer extends Layer{
    protected updates: boolean = true
    protected movesWithCamera: boolean = false
    private interactions:Interactions

    private static x = 352 / 2 - 60 / 2

    constructor(_interactions:Interactions){
        super()
        this.interactions = _interactions
        this.ctx.font = "16px monospace"
    }


    public update(): void {
        this.ctx.clearRect(0, 0, 352, 352)
        if(this.interactions.getActiveInteraction()){
            this.ctx.strokeStyle = "black"
            this.ctx.fillStyle = "white"
            // this.ctx.beginPath()
            // this.ctx.roundRect(DialogLayer.x - 1, 320 - 14, 60, 16, 5)
            // this.ctx.stroke()
            // this.ctx.fill()
            this.ctx.fillRect(DialogLayer.x - 1, 320 - 14, 60, 16)
            this.ctx.fillStyle = "black"
            this.ctx.fillText(this.interactions.getActiveInteraction()!.name, DialogLayer.x, 320)
        }
    }

}