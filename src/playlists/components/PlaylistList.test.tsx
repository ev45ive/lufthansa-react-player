import { cleanup, getByAltText, getByLabelText, getByRole, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import React from 'react'
import { Playlist } from '../../model/Playlist'
import { PlaylistList } from './PlaylistList'

describe.only('PlaylistList', () => {
    const playlistsMock: Playlist[] = [
        { id: '123', name: 'Playlista A', public: false, description: '' },
        { id: '234', name: 'Playlista B', public: false, description: '' },
        { id: '345', name: 'Playlista C', public: false, description: '' }
    ]

    const setup = ({
        playlists = playlistsMock,
        selectedId
    }: { playlists?: Playlist[], selectedId?: Playlist['id'] }) => {
        const selectSpy = jest.fn()
        const removeSpy = jest.fn()

        render(<PlaylistList
            onRemove={removeSpy
            }
            onSelected={selectSpy}
            selectedId={selectedId}
            playlists={playlists} />)
        return { playlists, selectSpy, removeSpy }
    }

    // RED -> GREEN -> Refactor
    test('shows "No playlists" message when no playlists', () => {
        setup({ playlists: [] })
        expect(screen.queryByRole('tab')).not.toBeInTheDocument()
        screen.getByText('No playlists')

        cleanup()
        const { playlists } = setup({})
        expect(screen.queryAllByRole('tab')).toHaveLength(playlists.length)
        expect(screen.queryByText('No playlists')).not.toBeInTheDocument()
    })

    test('shows list of playlists', () => {
        const { playlists } = setup({})
        const items = screen.getAllByRole('tab')
        for (let index in playlists) {
            expect(items[index]).toHaveTextContent(playlists[index].name)
        }
    })


    test('highligts selected playlist', () => {
        setup({ selectedId: '' })
        const noItems = screen.queryAllByRole('tab', { selected: true })
        expect(noItems).toHaveLength(0)

        cleanup()
        const { playlists } = setup({ selectedId: '234' })
        const items = screen.queryAllByRole('tab', { selected: true })
        expect(items).toHaveLength(1)
        expect(playlists[1].id).toEqual('234')
        expect(items[0]).toHaveTextContent(playlists[1].name)
        expect(items[0]).toHaveClass('active')
        // screen.debug(noItems)
    })

    test('emits select event when select clicked', () => {
        const { selectSpy, playlists } = setup({})

        userEvent.click(screen.getByText(playlists[0].name, { exact: false }))

        expect(selectSpy).toHaveBeenCalledWith(playlists[0].id)
    })

    test('emits remove event when remove clicked', () => {
        const { selectSpy, removeSpy, playlists } = setup({})

        const item = screen.getByText(playlists[0].name, { exact: false })
        const removeBtn = getByRole(item, 'button', { name: 'remove' })
        userEvent.click(removeBtn)

        expect(removeSpy).toHaveBeenCalledWith(playlists[0].id)
    })

    test.todo('emits create event when create new clicked')
})
