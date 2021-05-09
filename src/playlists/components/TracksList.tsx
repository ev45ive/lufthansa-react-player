import React, { Component } from 'react'
import { SimpleTrack, Track } from '../../model/Search'

interface Props {
    tracks: SimpleTrack[]
    selected?: SimpleTrack['id']
    onSelect(track: SimpleTrack): void
}
interface State {

}

const classes = (...classes: (string | false)[]) => classes.filter(Boolean).join(' ')

export default class TracksList extends Component<Props, State> {
    state = {}

    render() {
        return (
            <div>
                PlaylistTracks

                <div className="list-group">
                    {this.props.tracks.map(track =>
                        <div className={classes("list-group-item", this.props.selected === track.id && 'active')}
                            key={track.id}
                            onClick={() => this.props.onSelect(track)}>
                            {track.name}
                        </div>)}
                </div>
            </div>
        )
    }
}