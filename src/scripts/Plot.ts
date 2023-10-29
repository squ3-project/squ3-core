import Collision from "./actions/Collision";
import Interactions, {InteractionList} from "./actions/Interactions";
import GameLoop from "./GameLoop";
import BackgroundLayer from "./layers/BackgroundLayer";
import DialogLayer from "./layers/DialogLayer";
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
    private interactions:Interactions
    private collision:Collision
    
    constructor(_id:number, _mapJson:mapObject, _atlas:Atlas){
        // TODO: add validator for fields
        this.id = _id
        this.atlas = _atlas
        this.mapJson = _mapJson

        this.collision = new Collision(_mapJson.collisionString)
        this.interactions = new Interactions(_mapJson.interactions)
    }

    public init(callback:() => void):void{
        GameLoop.clearQueue()
        const backgroundLayer = new BackgroundLayer(this.atlas, this.mapJson.backgroundBlockId)
        const structureLayer = new StructureLayer(this.atlas, this.mapJson.mapString)
        const dialogLayer = new DialogLayer(this.interactions)
        GameLoop.addToQueue(backgroundLayer)
        GameLoop.addToQueue(structureLayer)
        GameLoop.addToQueue(dialogLayer)
        callback()
    }

    public addPlayer(_player:Player){
        _player.addCollision(this.collision)
        _player.addInteractions(this.interactions)
        GameLoop.setCamera(_player.getPosition())  
        GameLoop.addToQueue(_player)
    }

    public getId():number{
        return this.id
    }

    
}