import React from 'react'
import { AlbumView } from '../../model/Search'
import { AlbumCard } from './AlbumCard'

interface Props {
    albums: AlbumView[]
}

export const AlbumGrid = ({ albums }: Props) => {
    return (
        <div>
            <div className="row row-cols-1 row-cols-sm-4 no-gutters">
                {albums.map(album => <div className="col mb-4" key={album.id}>
                    <AlbumCard album={album} />
                </div>)}
            </div>
        </div>
    )
}
