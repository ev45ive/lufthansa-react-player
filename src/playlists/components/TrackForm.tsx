import React, { Component, PureComponent } from 'react'
import { SimpleTrack, Track } from '../../model/Search'

interface Props {
    track: SimpleTrack
    onSave(draft: SimpleTrack): void
}

interface State {
    track: SimpleTrack
}

export default class TrackForm extends PureComponent<Props, State> {
    state: State = {
        track: this.props.track
    }

    nameRef = React.createRef<HTMLInputElement>()

    componentDidMount() {
        this.nameRef.current?.focus()
    } // useEffect []
    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: { scrollPos: number }) {

    } // useEffect 
    componentWillUnmount() { console.log('Bye bye!') } // useEffect return () => {}

    // componentDidCatch(){}

    // this.setState(getDerivedStateFromProps())
    static getDerivedStateFromProps(nextProps: Readonly<Props>, prevState: State): Partial<State> {
        return { track: nextProps.track.id === prevState.track.id ? prevState.track : nextProps.track }
    }

    getSnapshotBeforeUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
        return { scrollPos: 123 }
    }

    // shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>) {
    //     return this.state.track !== nextState.track
    // }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value

        

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
                    <input type="text" className="form-control" value={this.state.track.name} onChange={this.handleChange} ref={this.nameRef}/>
                </div>
                <hr />
                <button className="btn btn-success" onClick={this.save}>Save</button>
            </div>
        )
    }
}