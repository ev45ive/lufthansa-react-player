import React, { Component } from 'react'
import { SimpleTrack, Track } from '../../model/Search'

interface Props {
    track: SimpleTrack
    onSave(draft: SimpleTrack): void
}

interface State {
    track: SimpleTrack
}

export default class TrackForm extends Component<Props, State> {
    state: State = {
        track: {
            id: '123', name: 'Track'
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value

        // this.state.track.name = value

        this.setState({
            track: {
                ...this.state.track,
                name: value
            }
        })
    }

    save = () => {
        this.props.onSave(this.state.track)
    }

    render() {
        return (
            <div>
                TrackForm
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" className="form-control" value={this.state.track.name} onChange={this.handleChange} />
                </div>
<hr/>
                <button className="btn btn-success" onClick={this.save}>Save</button>
            </div>
        )
    }
}