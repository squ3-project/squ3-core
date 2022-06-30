// ./
import Display from "./Display";
import GameLoop from "./GameLoop";
import KeyboardInput from "./KeyboardInput";
import Collision from "./Collision";

// ./layer
import BackgroundLayer from "./layers/BackgroundLayer";
import Player from "./layers/Player";
import StructureLayer from "./layers/StructureLayer";

// ./utils
import mapJson from "./utils/map.json"
import map2Json from "./utils/map2.json"
import Atlas from "./utils/Atlas";
import loadImage from "./utils/TextureLoader";

// ../assets
import atlasImg from "../assets/images/atlas.png"
import skin from "../assets/images/skin.png"
import Plot from "./Plot";
       




Display.resize(352, 352) // viewport 11x11 blocks
KeyboardInput.listen()

async function main() {
    const atlas = new Atlas(atlasImg)
    await atlas.loadImage()
    const playerSkinImg = await loadImage(skin)
    const player = new Player(playerSkinImg)
    console.log("Textures loaded!")
    player.setPosition(32, 32)

    let plot = new Plot(0, mapJson, atlas)
    plot.addPlayer(player)
   

    // for test
    document.addEventListener("keydown", (e:KeyboardEvent) => {
        if(e.key === "k"){

            if(plot.getId() === 1){
                plot = new Plot(0, mapJson, atlas)
                player.setPosition(32, 32)
                plot.addPlayer(player)
                return
            }

            plot = new Plot(1, map2Json, atlas)
            player.setPosition(64, 64)
            plot.addPlayer(player)
                     
        }
    })
    
    GameLoop.start()

}

main()