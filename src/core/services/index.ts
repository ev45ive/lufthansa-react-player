import axios, { AxiosError } from "axios";
import { AlbumView } from "../../model/Search";
import { AuthService } from "./AuthService";

export const auth = new AuthService({
    auth_url: 'https://accounts.spotify.com/authorize',
    client_id: '145df2ed82034af5b08e928c183b6d00',
    redirect_uri: 'http://localhost:3000/',
    response_type: 'token',
    scope: '',
    show_dialog: 'true'
});


// Spotify:
// holoyis165 @ bulkbye . com
// placki 777

axios.interceptors.request.use(config => {
    config.headers['Authorization'] = 'Bearer ' + auth.token;
    return config
})

axios.interceptors.response.use(resp => resp, (err: Error) => {
    if (!isAxiosError(err)) {
        return Promise.reject(err)
    }
    // Mock / Cache
    // return Promise.resolve({ data: { albums: { items: albumsMock } } });

    // Fix and Retry request
    // err.config.params.q = 'batman'
    // return axios.request(err.config)

    if (err.response?.status === 401) {
        auth.login()
    }

    return Promise.reject(err.response?.data.error)
})


auth.init()





// type Tab = Artist | Album

// const t: Tab = 'as' as any;

// if(t.type === 'album'){
//     t.artists
// }else{
//     t.
// }

export const isAxiosError = function (err: any): err is AxiosError<{ error?: { message: string } }> {
    return err.isAxiosError
}


const albumsMock: AlbumView[] = [
    { id: "123", name: "Album 123", type: "album", images: [{ height: 300, width: 300, url: "https://www.placecage.com/c/300/300" }] },
    { id: "234", name: "Album 234", type: "album", images: [{ height: 300, width: 300, url: "https://www.placecage.com/c/400/400" }] },
    { id: "345", name: "Album 345", type: "album", images: [{ height: 300, width: 300, url: "https://www.placecage.com/c/500/500" }] },
    { id: "456", name: "Album 456", type: "album", images: [{ height: 300, width: 300, url: "https://www.placecage.com/c/600/600" }] },
]