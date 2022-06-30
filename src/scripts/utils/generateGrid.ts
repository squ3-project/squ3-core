const fs = require("fs")
const path = require("path")

let mapString:string

let mapArray:string[] = []

let len:number = 900



for (let i = 0; i < len; i++) {
    mapArray[i] = "x"
}

mapArray[0] = "1"
mapArray[33] = "2"

mapString = mapArray.toString().replace(/,/g, ';')

const mapObject:any = {}

mapObject["mapString"] = mapString

console.log()
fs.writeFile(path.resolve(__dirname, 'map.json'), JSON.stringify(mapObject), (err:Error) => {
    if(err) throw err
})
// fs.we

// console.log(mapString)