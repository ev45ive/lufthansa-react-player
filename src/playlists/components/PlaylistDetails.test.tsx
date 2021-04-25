import { PlaylistDetails } from "./PlaylistDetails"
import { render, screen, cleanup, getRoles, logRoles } from '@testing-library/react';
import { Playlist } from "../../model/Playlist";

export { }

describe('PlaylistDetails', () => {

    const setup = (zmiany: Partial<Playlist>) => {
        const mockPlaylist: Playlist = {
            id: '123', description: 'opis', name: 'placki', public: true, ...zmiany
        };
        const editSpy = jest.fn(() => 'fake return value')
        const { container } = render(<PlaylistDetails playlist={mockPlaylist} edit={editSpy} />)
        // screen.debug(elem)
        return { container, editSpy }
    }

    test('emits edit event when button clicked', () => {
        const { editSpy, container } = setup({})
        screen.debug()
        // https://testing-library.com/docs/dom-testing-library/api-accessibility
        // console.log(getRoles(screen.getByRole('button')))
        // console.log(getRoles(container))
        // logRoles(container)
        const btn = screen.getByRole('button', { name: 'Edit' })
        btn.click()

        // editSpy.mock.calls[ callNumber ][ argNo ]
        expect(editSpy).toHaveBeenCalled()
    })

    test('shows playlist name', () => {
        setup({ name: 'Nalesniki' })
        const elem = screen.getByTestId('playlist_name')
        expect(elem).toHaveTextContent(/^Nalesniki$/)
    })

    test('shows playlist public', () => {
        setup({ public: true })
        const elem = screen.getByTestId('playlist_ispublic')
        expect(elem).toHaveTextContent('Yes')
        expect(elem).toHaveClass('playlistPublic')
    })

    test('shows playlist private', () => {
        setup({ public: false })
        const elem = screen.getByTestId('playlist_ispublic')
        expect(elem).toHaveTextContent('No')
        expect(elem).toHaveClass('playlistPrivate')
    })

    test('shows playlist description', () => {
        setup({ description: 'opisy kolorowe' })
        const elem = screen.getByTestId('playlist_description')
        expect(elem).toHaveTextContent(/^opisy kolorowe$/)
    })

})
