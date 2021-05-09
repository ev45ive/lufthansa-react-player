// tsrcc
import React, { Component } from 'react'
import { Playlist } from '../../model/Playlist'
import { SimpleTrack, Track } from '../../model/Search'
import SelectPlaylist from '../components/SelectPlaylist'
import TrackDetails from '../components/TrackDetails'
import TrackForm from '../components/TrackForm'
import  TracksList from '../components/TracksList'
import { SearchForm } from '../../core/components/SearchForm'

const playlistsData: Playlist[] = [
    {
        id: '123',
        name: 'Playlista 😇',
        public: true,
        description: 'no i co ja dzis polubie?..🤔',
        tracks: [
            { id: '123', name: 'Track 123' },
            { id: '234', name: 'Track 234' },
            { id: '345', name: 'Track 345' },
        ]
    },
    {
        id: '234',
        name: 'Playlista 😁',
        public: false,
        description: 'moze polubię TypeScript?. 🚀',
        tracks: [
            { id: '123a', name: 'Track ABC' },
            { id: '234d', name: 'Track DEF' },
            { id: '345b', name: 'Track GHI' },
        ]
    },
    {
        id: '345',
        name: 'Playlista 😆',
        public: true,
        description: 'albo wszystko polubię co mi tam 😅💖',
        tracks: [
            { id: '123d', name: 'Track XYZ' },
        ]
    },
]


interface Props {

}
interface State {
    playlists: Playlist[]
    selectedPlaylist?: Playlist
    selectedTrack?: SimpleTrack
}

export default class PlaylistTracks extends React.Component<Props, State> {
    state: State = {
        playlists: playlistsData,
        selectedPlaylist: playlistsData[0]
    }

    // constructor(props: Props) {
    //     super(props)
    //     // this.selectPlaylist = this.selectPlaylist.bind(this);
    //     this.selectPlaylist = () => this.selectPlaylist;
    // }

    selectTrack = (track: SimpleTrack) => {
        this.setState({ selectedTrack: track })
    }

    placki = 123

    selectPlaylist = (playlist_id: Playlist['id']) => {
        // debugger
        console.log(this)
        this.setState({
            selectedPlaylist: this.state.playlists.find(p => p.id === playlist_id),
            selectedTrack: undefined
        })
    }

    save = (draft: SimpleTrack) => {

        console.log(1, this.state.selectedPlaylist?.tracks![0].name)
        this.setState((prevState:State) => {
            console.log(4, this.state.selectedPlaylist?.tracks![0].name)
            return {
                selectedPlaylist: {
                    ...this.state.selectedPlaylist!,
                    tracks: this.state.selectedPlaylist?.tracks?.map(t => t.id === draft.id ? draft : t) || []
                }
            }
        }, () => console.log(6, this.state.selectedPlaylist?.tracks![0].name))
        console.log(2, this.state.selectedPlaylist?.tracks![0].name)

        this.setState((prevState:State) => {
            console.log(5, this.state.selectedPlaylist?.tracks![0].name)
            return {
                playlists: this.state.playlists.map(p => p.id !== this.state.selectedPlaylist?.id ? p : this.state.selectedPlaylist!),
            }
        }, () => console.log(7, this.state.selectedPlaylist?.tracks![0].name))
        console.log(3, this.state.selectedPlaylist?.tracks![0].name)
    }

    render() {
        console.log('render', this.state.selectedPlaylist?.tracks![0].name)
        return (
            <div>
                PlaylistTracks

                <div className="row">
                    <div className="col">
                        {/* <SelectPlaylist playlists={this.state.playlists} onSelect={(id) => this.selectPlaylist(id)} /> */}
                        <SearchForm onSearch={() => this.setState({})} query='' />
                        <SelectPlaylist playlists={this.state.playlists} onSelect={this.selectPlaylist} />
                        <hr />

                        {this.state.selectedPlaylist?.tracks?.length &&
                            <TracksList tracks={this.state.selectedPlaylist!.tracks} selected={this.state.selectedTrack?.id} onSelect={this.selectTrack} />}
                    </div>
                    <div className="col">
                        {this.state.selectedTrack && <TrackDetails track={this.state.selectedTrack} />}

                        {this.state.selectedTrack && <TrackForm track={this.state.selectedTrack} onSave={this.save} />}

                    </div>
                </div>
            </div>
        )
    }
}