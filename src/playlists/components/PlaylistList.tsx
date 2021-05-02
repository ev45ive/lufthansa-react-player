import React, { useState } from 'react'
import { Playlist } from '../../model/Playlist'


interface Props {
    playlists: Playlist[]
    selectedId?: string
    onSelected(id: string): void
    onRemove(id: Playlist['id']): void
}

export const PlaylistList = ({ playlists, selectedId, onSelected , onRemove}: Props) => {

    return (
        <div>
            {!playlists.length && <p>No playlists</p>}

            <ul className="list-group list-group-flush" role="tablist">
                {playlists.map((p, index) =>
                    <li role="tab" key={p.id}
                        aria-selected={p.id === selectedId}
                        onClick={() => onSelected(p.id)}
                        className={"list-group-item list-group-item-action " + (p.id === selectedId ? ' active' : '')}>
                        {index + 1}. {p.name}
                        <button className="btn btn-light close" aria-label="remove" onClick={()=>onRemove(p.id)}>&times;</button>                    </li>
                )}
            </ul>
        </div>
    )
}
// <div className="list-group" role="list">
//     {playlists.map((playlist, index) =>
//         <div className={`list-group-item ${selectedId === playlist.id ? 'active' : ''}`}
//             data-playlist-id={playlist.id}
//             onClick={() => { onSelected(playlist.id) }}
//             role="listitem"
//             key={playlist.id}>

//             <span>{playlist.name}</span>

//             <button className="btn btn-light close" onClick={(event) => {
//                 event.stopPropagation()
//                 onRemove(playlist.id)
//             }}>&times;</button>
//         </div>
//     )}
// </div>