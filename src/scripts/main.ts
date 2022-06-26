import Display from "./Display";
import Atlas from "./utils/Atlas";
import atlasImg from "../assets/images/atlas.png"
import GameLoop from "./GameLoop";
import BackgroundLayer from "./layers/BackgroundLayer";
import TestLayer from "./layers/TestLayer";

Display.resize(960, 960)

async function main() {
    const atlas = new Atlas(atlasImg)
    await atlas.loadImage()
    console.log("Textures loaded!")
    const bgLayer = new BackgroundLayer(atlas, 1)
    const test = new TestLayer(atlas)
    GameLoop.addToQueue(bgLayer)
    GameLoop.addToQueue(test)
    GameLoop.start()

}

main()