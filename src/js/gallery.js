import { UnsplashAPI } from "./UnsplashAPI";
const api = new UnsplashAPI();
api.getPopularPhotos(1).then(result => console.log(result))

