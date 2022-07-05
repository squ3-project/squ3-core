import { Interaction } from "./Interaction";

export interface PortalObj{
    x:number
    y:number,
    to:number
}

export default class Portal extends Interaction<number>{
    private to:number;
    /**
     * Creates Portal interaction in x, y coordinates
     * @param _x - x coordinate
     * @param _y - y coordiante
     */
    constructor(_x:number, _y:number, _to:number){
        super(_x, _y)
        this.to = _to
    }

    public activate():number{
        return this.to
    }

}