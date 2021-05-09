import React, { Component } from 'react'
import { Playlist } from '../../model/Playlist'

interface Props {
    playlists: Playlist[]
    onSelect(playlist_id: Playlist['id']): void
}
interface State {

}

export default class SelectPlaylist extends Component<Props, State> {
    state = {}

    render() {
        return (
            <div>
                <label>SelectPlaylist</label>
                <select className="form-control" onChange={e => {
                    const playlist_id = e.currentTarget.selectedOptions[0].value
                    this.props.onSelect(playlist_id);
                }}>
                    {this.props.playlists.map(playlist => <option key={playlist.id} value={playlist.id}>
                        {playlist.name}
                    </option>)}
                </select>
            </div>
        )
    }
}