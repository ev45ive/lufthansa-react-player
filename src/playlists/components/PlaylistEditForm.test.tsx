import { act, fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Playlist } from "../../model/Playlist"
import { PlaylistEditForm } from "./PlaylistEditForm"


// describe.skip('PlaylistEditForm', () => {
// describe.only('PlaylistEditForm', () => {
describe('PlaylistEditForm', () => {

    const setup = (zmiany: Partial<Playlist>) => {
        const playlist: Playlist = {
            id: '123', name: "Placki", description: 'Awesome', public: true, ...zmiany
        }
        const cancelSpy = jest.fn();

        const saveSpy = jest.fn<Error[] | null, [Playlist]>()
        const { rerender } = render(<PlaylistEditForm playlist={playlist} cancel={cancelSpy} save={saveSpy} />)
        return { cancelSpy, saveSpy, playlist, rerender }
    }

    test('shows playlist details', () => {
        const { } = setup({})
        const nameel = screen.getByLabelText('Name:')
        const nameelem2 = screen.getByDisplayValue('Placki')
        // expect(elem).toHaveAttribute('value','Placki')
        expect(nameel).toBe(nameelem2)
        const descrel = screen.getByDisplayValue('Awesome')
        const checkel = screen.getByLabelText('Public')
        expect(checkel).toBeChecked()
    })

    test('counts playlist name length', () => {
        const { } = setup({})
        const nameInputEl = screen.getByLabelText('Name:') as HTMLInputElement
        const counterRefEl = screen.getByTestId('name_len_counter')
        expect(counterRefEl).toHaveTextContent(`${nameInputEl.value.length} / 170`)

        // https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
        // act(() => { // force all pending re-renders in Sync mode
        //     nameInputEl.value = "Zmienione"
        //     const ev = new InputEvent('input', { bubbles: true })
        //     nameInputEl.dispatchEvent(ev)
        // })
        // fireEvent.change(nameInputEl, { target: { value: "Zmienione" } })

        userEvent.clear(nameInputEl)
        userEvent.type(nameInputEl, 'Zmienione', { /* delay: 0  */ })

        expect(counterRefEl).toHaveTextContent(`${"Zmienione".length} / 170`)
    })

    test('emits on cancel with no changes', () => {
        const { cancelSpy } = setup({})

        const cancelBtn = screen.getByRole('button', { name: 'Cancel' })
        userEvent.click(cancelBtn)

        expect(cancelSpy).toHaveBeenCalledTimes(1)
    })

    test.skip('change selected playlist without unsaved changes', () => {
        const { cancelSpy, saveSpy, playlist, rerender } = setup({})

        const innaPlaylist: Playlist = { id: '234', name: 'Inna', description: '', public: true }
        rerender(<PlaylistEditForm playlist={innaPlaylist} cancel={cancelSpy} save={saveSpy} />)
        
        const UnsavedChanges = screen.getByText('Unsaved Changes')
        const descrel = screen.getByDisplayValue('Inna')
    })

    test.skip('change selected playlist with unsaved changes', () => {

    })

    test('emits changed playlist on save', () => {
        const { saveSpy, playlist } = setup({})

        const nameInputEl = screen.getByLabelText('Name:') as HTMLInputElement

        userEvent.clear(nameInputEl)
        userEvent.type(nameInputEl, 'Zmienione i zapisane', {})

        const saveBtn = screen.getByRole('button', { name: 'Save' })
        userEvent.click(saveBtn)

        expect(saveSpy).toHaveBeenCalledWith({
            ...playlist,
            name: 'Zmienione i zapisane'
        })
    })

    test.todo('shows empty playlist ')


})
