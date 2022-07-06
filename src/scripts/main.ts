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
import skin from "../assets/images/skin.png"
import Plot from "./Plot";
       


const jsons = [mapJson, map2Json, map3Json]

Display.resize(352, 352) // viewport 11x11 blocks
KeyboardInput.listen()

async function main() {
    const atlas = new Atlas(atlasImg)
    await atlas.loadImage()
    const playerSkinImg = await loadImage(skin)
    const player = new Player(playerSkinImg)
    console.log("Textures loaded!")
    player.setPosition(32,32)

    let plot:Plot

    changePlot(0) // initial map

    function changePlot(to:number){
        plot = new Plot(to, jsons[to], atlas)
        
        plot.addPlayer(player)

        player.getInteractions().onActive = () => {
            player.getInteractions().plotIdToChange((id:number,x:number, y:number) => {
                player.setPosition(x*32, y*32)
                changePlot(id)
            })
        }
    }   
    GameLoop.start()
}

main()