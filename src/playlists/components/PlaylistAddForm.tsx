import React, { ChangeEvent, useEffect, useState } from 'react'
import { Playlist } from '../../model/Playlist'

interface Props {
  saveNewPlaylist: (newPlaylist: Playlist) => void
  cancelNewPlaylist: () => void
  selectedId?: string
  setMode: (mode: "details" | "form" | "addForm") => void;
}

export const PlaylistAddForm = ({ saveNewPlaylist, cancelNewPlaylist, selectedId, setMode }: Props) => {
  const [playlistId, setPlaylistId] = useState(Date.now().toString())
  const [name, setName] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')
  const [acceptNew, setAcceptNew] = useState(false)
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(selectedId)

  
  useEffect(() => {
    if (selectedPlaylistId !== selectedId) {
      if (acceptNew) {
        setAcceptNew(false)
        setMessage('')
        setMode('details')

      } else {
        setMessage('Unsaved Changes')
      }
    }
  }, [acceptNew, selectedPlaylistId, selectedId])

  const submitForm = () => {
    saveNewPlaylist({
      id: playlistId,
      name: name,
      public: isPublic,
      description: description
    })
  }

  return (
    <div>
      <h3>PlaylistAddForm</h3>

      {message && <div className="alert alert-danger">{message} <button onClick={() => setAcceptNew(true)}>OK</button></div>}

      <div className="form-group">
        <label>Name:</label>
        <input type="text" className="form-control" value={name}
          onChange={event => setName(event.target.value)} />
        <p>{name.length} / 170</p>
      </div>

      <div className="form-check">
        <label><input type="checkbox" className="form-check-input" checked={isPublic}
          onChange={event => setIsPublic(event.target.checked)} /> Public </label>
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)} ></textarea>
      </div>

      <button className="btn btn-danger" onClick={cancelNewPlaylist}>Cancel</button>
      <button className="btn btn-success" onClick={submitForm}>Save</button>
    </div>
  )
}


