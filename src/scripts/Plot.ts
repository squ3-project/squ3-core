import Collision from "./actions/Collision";
import Interactions, {InteractionList} from "./actions/Interactions";
import GameLoop from "./GameLoop";
import BackgroundLayer from "./layers/BackgroundLayer";
import Player from "./layers/Player";
import StructureLayer from "./layers/StructureLayer";
import Atlas from "./utils/Atlas";

type mapObject = {
    backgroundBlockId:number
    mapString:string,
    collisionString:string
    interactions: InteractionList
}


export default class Plot{
    private id:number
    private atlas:Atlas
    private mapJson:mapObject
    
    constructor(_id:number, _mapJson:mapObject, _atlas:Atlas){
        this.id = _id
        this.atlas = _atlas
        this.mapJson = _mapJson
        this.createLayers(_atlas)
    }

    private createLayers(_atlas:Atlas):void{
        GameLoop.clearQueue()
        const backgroundLayer = new BackgroundLayer(_atlas, this.mapJson.backgroundBlockId)
        const structureLayer = new StructureLayer(_atlas, this.mapJson.mapString)
        GameLoop.addToQueue(backgroundLayer)
        GameLoop.addToQueue(structureLayer)
    }

    public addPlayer(_player:Player){
        const collision = new Collision(this.mapJson.collisionString)
        const interactions = new Interactions(this.mapJson.interactions)
        _player.addCollision(collision)
        _player.addInteractions(interactions)
        GameLoop.setCamera(_player.getPosition())
        GameLoop.addToQueue(_player)
    }

    public getId():number{
        return this.id
    }

    
}