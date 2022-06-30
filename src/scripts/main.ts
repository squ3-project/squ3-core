// ./
import Display from "./Display";
import GameLoop from "./GameLoop";
import KeyboardInput from "./KeyboardInput";

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



Display.resize(352, 352)
KeyboardInput.listen()

async function main() {
    const atlas = new Atlas(atlasImg)
    await atlas.loadImage()
    const playerSkinImg = await loadImage(skin)
    console.log("Textures loaded!")
    const bgLayer = new BackgroundLayer(atlas, 2)
    const structLayer = new StructureLayer(atlas, mapJson.mapString)
    const player = new Player(playerSkinImg)
    GameLoop.createCamera(player.getPosition())
    GameLoop.addToQueue(bgLayer)
    GameLoop.addToQueue(structLayer)
    GameLoop.addToQueue(player)
    GameLoop.start()

}

main()