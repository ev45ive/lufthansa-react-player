import axios from "axios"
import { Playlist } from "../../model/Playlist"
import { PagingObject } from "../../model/Search"
import { useFetch } from "./useFetch"


// export const usePlaylists = (): [{ isLoading: boolean, message: string, results: Playlist[] | null }, Function] => {

export const fetchPlaylists = (): Promise<Playlist[]> => {
    // throw Error('Not implemented yet!!!')
    // // useFetch(() => axios.get())

    return axios.get<PagingObject<Playlist>>('https://api.spotify.com/v1/me/playlists').then(resp => resp.data.items)

}



export const fetchPlaylist = (id: Playlist['id']): Promise<Playlist> => {
    return axios.get<Playlist>('https://api.spotify.com/v1/playlists/' + id).then(resp => resp.data)

}