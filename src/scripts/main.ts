// ./
import Display from "./Display";
import GameLoop from "./GameLoop";
import KeyboardInput from "./KeyboardInput";

// ./layer
import Player from "./layers/Player";

// ./utils
import mapJson from "./utils/map.json"
import map2Json from "./utils/map2.json"
import map3Json from "./utils/map3.json"
import Atlas from "./utils/Atlas";
import loadImage from "./utils/TextureLoader";

// ../assets
import atlasImg from "../assets/images/atlas.png"
import skin from "../assets/images/skindef.png"
import Plot from "./Plot";
       
interface MapAfter {
    _id:number,
    backgroundBlockId: number,
    mapString: string,
    collisionString: string,
    interactions: Array<any>
}

// const params = new URLSearchParams(document.location.search)
// const id = params.get("id")

const jsons = [mapJson, map2Json, map3Json]

// const serverUrl = "http://squ3-server.herokuapp.com"

Display.resize(352, 352) // viewport 11x11 blocks
KeyboardInput.listen()

async function main() {
    const atlas = new Atlas(atlasImg, 256)
    // const atlas = new Atlas(serverUrl + "/getatlas", 3200)
    await atlas.loadImage()
    const playerSkinImg = await loadImage(skin)
    const player = new Player(playerSkinImg)
    console.log("Textures loaded!")
    
    GameLoop.start()
    let plot:Plot
    player.setPosition(32,32)

    // const {backgroundBlockId, mapString, collisionString, interactions} = jsons[0]

    // plot = new Plot(0, jsons[0], atlas)


    // const response = await fetch(serverUrl+"/map?id="+id)
    // const {_id, backgroundBlockId, mapString, collisionString, interactions } = await response.json() as MapAfter
    // if(!_id){
    //     console.log("Wrong plot id!")
    // }

    // plot = new Plot(_id, {backgroundBlockId, mapString, collisionString, interactions: {portals: []}}, atlas)
    // plot.init(() => plot.addPlayer(player))

    

    changePlot(0) // initial map

    function changePlot(to:number){
    
        plot = new Plot(to, jsons[to], atlas)
        plot.init(() => console.log("..."))
        
        plot.addPlayer(player)

        player.getInteractions().onActive = () => {
            player.getInteractions().plotIdToChange((id:number,x:number, y:number) => {
                player.setPosition(x*32, y*32)
                changePlot(id)
            })
        }
    }   
    
}

main()