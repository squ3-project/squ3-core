// // //

export default async function loadImage(_url:string):Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image()
        image.src = _url 
        image.onload = () => resolve(image)
    })
}