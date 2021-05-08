import React, { useEffect, useState } from 'react'
import { fetchPlaylist, fetchPlaylists } from '../../core/hooks/usePlaylists'
import { Playlist } from '../../model/Playlist'
import { PlaylistDetails } from '../components/PlaylistDetails'
import { PlaylistList } from '../components/PlaylistList'

interface Props {

}

export const PlaylistsTDD = (props: Props) => {
    const [playlists, setPlaylists] = useState<Playlist[]>([])
    const [selectedId, setSelectedId] = useState('')
    const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null)

    useEffect(() => {
        fetchPlaylists().then(res => {
            setPlaylists(res)
        })
    }, [])

    useEffect(() => {
        if (!selectedId) return;

        fetchPlaylist(selectedId).then(resp => setSelectedPlaylist(resp))
    }, [selectedId])

    return (
        <div>
            <div className="row">
                <div className="col">

                    <PlaylistList playlists={playlists}
                        onRemove={() => { }}
                        onSelected={setSelectedId}
                    />
                </div>
                <div className="col">
                    {selectedPlaylist && <PlaylistDetails playlist={selectedPlaylist} edit={() => { }} />}

                </div>
            </div>


        </div>
    )
}
