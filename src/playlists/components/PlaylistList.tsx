import React, { useState } from 'react'
import { Playlist } from '../../model/Playlist'

interface Props {
    playlists: Playlist[]
    selectedId?: string
    onSelected(id: string): void 
    onRemove(id: Playlist['id']): void
}

export const PlaylistList = React.memo(({
    playlists, selectedId, onSelected, onRemove
}: Props) => {

    console.log('render');
    return (
        <div>
            <div className="list-group">
                {playlists.map((playlist, index) =>
                    <div className={`list-group-item ${selectedId === playlist.id ? 'active' : ''}`}
                        data-playlist-id={playlist.id}
                        onClick={() => { onSelected(playlist.id) }}
                        key={playlist.id}>

                        <span>{playlist.name}</span>

                        <button className="btn btn-light close" onClick={(event) => {
                            event.stopPropagation()
                            onRemove(playlist.id)
                        }}>&times;</button>
                    </div>
                )}
            </div>
        </div>
    )
})