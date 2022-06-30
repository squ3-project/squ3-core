const fs = require("fs")
const path = require("path")

let mapString:string
let collisionString:string

let mapArray:string[] = []
let collisionArray:string[] = []

let len:number = 900



for (let i = 0; i < len; i++) {
    mapArray[i] = "x"
    collisionArray[i] = "0"
}

mapArray[91] = "2"
collisionArray[91] = "1"

mapArray[95] = "17"
collisionArray[95] = "1"

mapString = mapArray.toString().replace(/,/g, ';')
collisionString = collisionArray.toString().replace(/,/g, '')

const mapObject:any = {}

mapObject["backgroundBlockId"] = 0
mapObject["mapString"] = mapString
mapObject["collisionString"] = collisionString

fs.writeFile(path.resolve(__dirname, 'map2.json'), JSON.stringify(mapObject), (err:Error) => {
    if(err) throw err
})
