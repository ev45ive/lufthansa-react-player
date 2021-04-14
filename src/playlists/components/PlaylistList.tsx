import React, { useState } from 'react'
import { Playlist } from '../../model/Playlist'

interface Props {
    playlists: Playlist[]
    selectedId?: string
    onSelected(id: string): void
    setPlaylists(playlists: Playlist[]): void
}

export const PlaylistList = ({ playlists, selectedId, onSelected, setPlaylists}: Props) => {
    
    const deletePlaylist = (id:any) => {
        const newList = playlists.filter((item) => item.id !== id);
        setPlaylists(newList);
        
    }
    return (
        <div>
            <div className="list-group">
                {playlists.map((playlist, index) =>
                    <div className={`list-group-item ${selectedId === playlist.id ? 'active' : ''}`}
                        onClick={() => onSelected(playlist.id)}
                        key={playlist.id}>
                        {playlist.name}

                        <span className="close" onClick={() => deletePlaylist(playlist.id)}>&times;</span>
                    </div>
                )}
            </div>
        </div>
    )
}
