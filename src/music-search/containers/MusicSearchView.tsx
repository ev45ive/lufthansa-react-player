import React from 'react'
import { Album, AlbumView } from '../../model/Search'
import { AlbumGrid } from '../components/AlbumGrid'
import { SearchForm } from '../components/SearchForm'
import { fetchAlbums, fetchArtists, useFetch, useSearchAlbums } from '../../core/hooks/useSearchAlbums'

interface Props { }

const albumsMock: AlbumView[] = [
    { id: "123", name: "Album 123", type: "album", images: [{ height: 300, width: 300, url: "https://www.placecage.com/c/300/300" }] },
    { id: "234", name: "Album 234", type: "album", images: [{ height: 300, width: 300, url: "https://www.placecage.com/c/400/400" }] },
    { id: "345", name: "Album 345", type: "album", images: [{ height: 300, width: 300, url: "https://www.placecage.com/c/500/500" }] },
    { id: "456", name: "Album 456", type: "album", images: [{ height: 300, width: 300, url: "https://www.placecage.com/c/600/600" }] },
]

/* 
    TODO:
    - make one reusable AbstractSearchView < X , Y, Z, ... >(z,y,x, ... )
    - create concrete Views (ALbum,artist,...) by injecting changes into AbstractSearchView
    - use abstract useFetch with concrete fetchers (fetchAlbums, fetchArtists, ...)

*/


export const MusicSearchView = (props: Props) => {
    const [{ isLoading, message, results }, setQuery] = useFetch(fetchAlbums)

    // return <AbstractSearchView x={...} y={...} ... />

    return (
        <div>
            <div className="row">
                <div className="col">
                    <SearchForm onSearch={setQuery} />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    {isLoading && <p className="alert alert-info">Loading</p>}
                    {message && <p className="alert alert-danger">{message}</p>}

                    {results && <AlbumGrid albums={results} />}
                </div>
            </div>
        </div>
    )
}
