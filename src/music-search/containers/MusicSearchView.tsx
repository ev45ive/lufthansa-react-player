import React from 'react'
import { Album, AlbumView } from '../../model/Search'
import { AlbumGrid } from '../components/AlbumGrid'
import { SearchForm } from '../components/SearchForm'
import { useSearchAlbums } from '../../core/hooks/useSearchAlbums'

interface Props { }

const albumsMock: AlbumView[] = [
    { id: "123", name: "Album 123", type: "album", images: [{ height: 300, width: 300, url: "https://www.placecage.com/c/300/300" }] },
    { id: "234", name: "Album 234", type: "album", images: [{ height: 300, width: 300, url: "https://www.placecage.com/c/400/400" }] },
    { id: "345", name: "Album 345", type: "album", images: [{ height: 300, width: 300, url: "https://www.placecage.com/c/500/500" }] },
    { id: "456", name: "Album 456", type: "album", images: [{ height: 300, width: 300, url: "https://www.placecage.com/c/600/600" }] },
]

/* TODO:
    - W AppComponent - przelaczane widoki jako zakladki do wyboru - "Szukaj Albumow" i "Szukaj Artystow" 
    ( + opcjonalnie zakladka "Playlisty" z PlaylistView ) https://getbootstrap.com/docs/4.6/components/navs/#tabs
    - Wyszukiwarka Artystow - {"q": "Bon Jovi", "type":"artist"}
    - Wykorzystaj ponownie Formularz wyszukiwania na nowym ekranie!
    - Wyniki w formie Card Grid lub Table lub list... (dowolnie)
    
    // Konto Spotify:
    // holoyis165 @ bulkbye . com
    // placki 777
    
    // Nie zmienamy nic w services / auth.

    - https://developer.spotify.com/documentation/web-api/reference/#endpoint-search
*/

export const MusicSearchView = (props: Props) => {
    // const { searchAlbums, isLoading, message, results } = useSearchAlbums('http://localhost:3000/data/albums.json')
    const {
        searchAlbums,
        isLoading,
        message,
        results
    } = useSearchAlbums('https://api.spotify.com/v1/search')

    return (
        <div>
            <div className="row">
                <div className="col">
                    <SearchForm onSearch={searchAlbums} />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    {isLoading && <p className="alert alert-info">Loading</p>}
                    {message && <p className="alert alert-danger">{message}</p>}

                    <AlbumGrid albums={results} />
                </div>
            </div>
        </div>
    )
}
