import KeyboardInput from "../KeyboardInput";
import { Interaction } from "./Interaction";
import Portal, { PortalObj } from "./Portal";
import portalRoutes from "./portalRoutes.json"

export interface InteractionList{
    portals: number[]
}

// any -> okreslone typy return z activate() w Interactions

export default class Interactions{
    private interactionList:Interaction<any>[] = []
    
    private currentInteraction?:Interaction<any>

    constructor(_interactions:InteractionList){
        _interactions.portals.forEach((id:number) => {
            // const {x, y, to} = portal
            const foundPortal= portalRoutes.find((portal:PortalObj) => portal.id === id)
            if(foundPortal){
                const foundDestinationPortal = portalRoutes.find((portal:PortalObj) => portal.id === foundPortal.connectedWithId)
                if(foundDestinationPortal){
                    this.interactionList.push(new Portal(foundPortal.x, foundPortal.y, foundDestinationPortal.plotId, foundDestinationPortal.x, foundDestinationPortal.y +1))
                }
                
            }    
        });

        this.keysHandler()
    }

    private keysHandler():void{
        KeyboardInput.onChangeInteractions = () => {
            const [key, isDown] = KeyboardInput.getKeysState()
        
            if(key === "e" && isDown){
                if(this.currentInteraction){
                    if(this.currentInteraction instanceof Portal){
                        const [id, x, y] = this.currentInteraction.activate()
                        this.plotIdToChange = (callback: (id:number, x:number, y:number) => void) => {
                            callback(id, x, y)
                        }
                        this.onActive()
                    }
                }
            }
        }
        
    }

    /**
     * [IN FUTURE MAYBE]
     * interaction.onChangeMap(to => {
     *
     * })
     *  
     */

    /**
     * Is triggered when any interaction is activated 
     */
    public onActive(){
        throw new Error("Method not implemented.")
    }

    /**
     * Gives a callback with id of plot to change
     */
    public plotIdToChange(callback: (id: number, x:number, y:number) => void){
        throw new Error("Method not implemented.")
    }

    /**
     * Handles interactions for Player depeding on given x,y coordinates
     * Should be called on every update method call in Player class
     * @param _x x coordinate
     * @param _y y coordiante
     */
    public handleInteractions(_x:number, _y:number){
        if(this.currentInteraction === undefined){
            this.interactionList.forEach((interaction:Interaction<any>) => {
                if(interaction.checkIfInRange(_x, _y)){
                    this.currentInteraction = interaction
                }
            })
        }

        if(this.currentInteraction){
            if(!this.currentInteraction.checkIfInRange(_x, _y)){
                this.currentInteraction = undefined
            } 
        }
    }
}