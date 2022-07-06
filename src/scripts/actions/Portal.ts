import { Interaction } from "./Interaction";

export interface PortalObj{
    id:number
    plotId:number
    x:number
    y:number
    connectedWithId:number
}

export default class Portal extends Interaction<[number, number, number]>{
    private toPlotId:number
    private toX:number
    private toY:number

    /**
     * Creates Portal interaction in x, y coordinates
     * @param _x - x coordinate on Plot
     * @param _y - y coordiante on Plot
     * @param _toMapId - map id destination
     * @param _toX - destination coordinate x
     * @param _toY - destination coordinate y
     */
    constructor(_x:number, _y:number, _toPlotId:number, _toX:number, _toY:number){
        super(_x, _y)
        this.toPlotId = _toPlotId
        this.toX = _toX
        this.toY = _toY 
    }

    /**
     * Return tuple with destination plot id, destination x coordinate and y coordiante
     * @returns [toPlotId, toX, toY]
     */
    public activate():[number, number, number]{
        return [this.toPlotId, this.toX, this.toY]
    }

}