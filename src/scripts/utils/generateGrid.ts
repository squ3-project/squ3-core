const fs = require("fs")
const path = require("path")

interface Structure{
    id:number
    x:number
    y:number
    c:boolean
}

interface Portal{
    x:number
    y:number
    to:number
}

interface Interactions{
    portals: Portal[]
}

interface MapBefore{
    backgroundBlock:number
    structures: Structure[],
    interactions: Interactions
}

let mapString:string
let collisionString:string

let mapArray:string[] = []
let collisionArray:string[] = []

let len:number = 900
const mapObject:any = {}


async function readBefore(pathToBeforeMap:string):Promise<MapBefore>{
    const content:Buffer = await fs.readFileSync(path.resolve(__dirname, pathToBeforeMap))
    const contentString = await content.toString()
    const json:MapBefore = await JSON.parse(contentString)
    return json
}

async function createMapStrings(path:string){
    initializeArrays()
    const mapBefore = await readBefore(path)

    // converters
    mapBefore.structures.forEach((structure:Structure) => {
        const position = calcutePositionInArray(structure.x, structure.y)
        mapArray[position] = structure.id.toString()
        if(structure.c) collisionArray[position] = "1"
    })

    mapObject["backgroundBlockId"] = mapBefore.backgroundBlock
    mapString = mapArray.toString().replace(/,/g, ';')
    collisionString = collisionArray.toString().replace(/,/g, '')
    mapObject["mapString"] = mapString
    mapObject["collisionString"] = collisionString  

     // things which are passed unchanged
    mapObject["interactions"] = mapBefore.interactions
}

function calcutePositionInArray(x:number, y:number):number{
    return x + y*30
}


function initializeArrays(){
    for (let i = 0; i < len; i++) {
        mapArray[i] = "x"
        collisionArray[i] = "0"
    }
}

function loadToFile(){
    fs.writeFile(path.resolve(__dirname, 'map3.json'), JSON.stringify(mapObject), (err:Error) => {
        if(err) throw err
    })
}


async function main(){
    await createMapStrings('./mapBefore2.json')
    loadToFile()
}

main()




