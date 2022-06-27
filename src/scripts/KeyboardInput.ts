export default class KeyboardInput{
    
    private constructor() {}
    public static keydown:boolean = false
    private static currentKey:string = ""

    /**
     * Listens for keydown and keyup keybord events
     */
    public static listen():void{
        document.addEventListener("keydown", (e:KeyboardEvent) => {
            KeyboardInput.keydown = true
            KeyboardInput.currentKey = e.key
            KeyboardInput.onChange()
            
            // if(e.key.match(/^(w|a|s|d)$/)) console.log("Player keys!")
        })

        document.addEventListener("keyup", (e:KeyboardEvent) => {
            KeyboardInput.keydown = false
            KeyboardInput.currentKey = e.key
            KeyboardInput.onChange()
        })
    }
    
    /**
     * Is triggered on keydown or keyup event
     */
    public static onChange() {
        throw new Error("Method not implemented.")
    }

    /**
     * Returns key state
     * @returns [key, is key down]
     */
    public static getKeysState():[string, boolean]{
        return [KeyboardInput.currentKey, KeyboardInput.keydown]
    }
}