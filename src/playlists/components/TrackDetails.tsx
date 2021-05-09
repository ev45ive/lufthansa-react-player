import React, { Component } from 'react'
import { SimpleTrack, Track } from '../../model/Search'

interface Props {
    track: SimpleTrack
}
interface State {

}

export default class TrackDetails extends Component<Props, State> {
    state = {}

    render() {
        return (
            <div>
                TrackDetails

                <dl>
                    <dt>Name:</dt>
                    <dd>{this.props.track.name}</dd>
                </dl>
            </div>
        )
    }
}