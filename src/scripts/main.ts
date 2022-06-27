import Display from "./Display";
import Atlas from "./utils/Atlas";
import loadImage from "./utils/TextureLoader";

import GameLoop from "./GameLoop";
import BackgroundLayer from "./layers/BackgroundLayer";

import TestLayer from "./layers/TestLayer";
import Layer from "./Layer";
import Player from "./layers/Player";

import atlasImg from "../assets/images/atlas.png"
import skin from "../assets/images/skin.png"
import KeyboardInput from "./KeyboardInput";

Display.resize(352, 352)
KeyboardInput.listen()

async function main() {
    const atlas = new Atlas(atlasImg)
    await atlas.loadImage()
    const playerSkinImg = await loadImage(skin)
    console.log("Textures loaded!")
    const bgLayer = new BackgroundLayer(atlas, 2)
    const test = new TestLayer(atlas)
    const player = new Player(playerSkinImg)
    // const test = new TestLayer(atlas)
    GameLoop.addToQueue(bgLayer)
    GameLoop.addToQueue(test)
    GameLoop.addToQueue(player)
    GameLoop.start()

}

main()