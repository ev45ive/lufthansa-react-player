// tsrafc
import React, { useEffect, useState } from 'react'
import { Playlist } from '../../model/Playlist'
import { PlaylistDetails } from '../components/PlaylistDetails'
import { PlaylistEditForm } from '../components/PlaylistEditForm'
import { PlaylistList } from '../components/PlaylistList'

interface Props { }

const data: Playlist[] = [
    {
        id: '123',
        name: 'Playlista 😇',
        public: true,
        description: 'no i co ja dzis polubie?..🤔'
    },
    {
        id: '234',
        name: 'Playlista 😁',
        public: false,
        description: 'moze polubię TypeScript?. 🚀'
    },
    {
        id: '345',
        name: 'Playlista 😆',
        public: true,
        description: 'albo wszystko polubię co mi tam 😅💖'
    },

]

export const PlaylistsView = (props: Props) => {
    const [selectedId, setSelectedId] = useState<string | undefined>()
    const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | undefined>()
    const [mode, setMode] = useState<'details' | 'form'>('details')
    const [playlists, setPlaylists] = useState<Playlist[]>(data)

    /* TODO:

        - git checkout -b mojezadanie1
        - git add .
        - git commit -m "Moje zadanie"
        - git checkout master
        - git pull
        - git checkout -b mojezadanie2
        - szuru buru...
        - git add .
        - git commit -m "Moje zadanie 2"


        - Show "Please select playlist when nothing selected"
        - Remove playlists when X clicked
        - Create new playlist
            - Show Empty form when button [ Create new playlist ] cliked
            - Cancel... go back to details.
            - Save - add new playlist to list and select in in details.
    */

    const edit = () => {
        setMode('form')
    }
    const cancel = () => {
        setMode('details')
    }
    const save = (draft: Playlist) => {
        setMode('details')
        setPlaylists(playlists.map(p => p.id === draft.id ? draft : p))
    }

    useEffect(() => {
        setSelectedPlaylist(playlists.find(p => p.id == selectedId))
    }, [selectedId, playlists])

    return (
        <div>
            <h4>PlaylistsView</h4>
            {/* .row>.col*2 */}
            <div className="row">
                <div className="col">
                    <PlaylistList
                        onSelected={id => { setSelectedId(id) }}
                        playlists={playlists}
                        selectedId={selectedId} 
                        setPlaylists={setPlaylists}/>

                    <button className="btn btn-info btn-block mt-4">Create New Playlist</button>
                </div>
                <div className="col">
                    {selectedPlaylist && mode === 'details' && <PlaylistDetails
                        edit={edit}
                        playlist={selectedPlaylist} />}
                    {selectedPlaylist && mode === 'form' && <PlaylistEditForm
                        save={save}
                        playlist={selectedPlaylist}
                        cancel={cancel} />}

                        {!selectedPlaylist && mode === 'details' && <div className="alert alert-info">Please select playlist</div>}
                </div>
            </div>
        </div>
    )
}
