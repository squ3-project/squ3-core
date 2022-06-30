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

    const plot = new Plot(0, mapJson, atlas)
    plot.addPlayer(player)
    
    GameLoop.start()

}

main()