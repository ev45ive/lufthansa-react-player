import { render, screen, logRoles, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { SearchForm } from "./SearchForm"

describe('SearchForm', () => {

    const setup = () => {
        const searchSpy = jest.fn()
        const { container } = render(<SearchForm onSearch={searchSpy} />)
        return { container, searchSpy }
    }

    test('emits query to parent on enter', () => {
        const { searchSpy, container } = setup()

        const input = screen.getByPlaceholderText('Search', {})
        userEvent.type(input, 'ala ma kota{enter}')

        expect(searchSpy).toHaveBeenCalledWith('ala ma kota')
        // logRoles(container)
    })

    // thrown: "Exceeded timeout of 5000 ms for a test.        
    test('emits query to parent after period of no typing', () => {
        jest.useFakeTimers()
        const { searchSpy, container } = setup()
        jest.runOnlyPendingTimers();

        const input = screen.getByPlaceholderText('Search', {})
        // fireEvent.change(input, { target: { value: 'test' } })
        // Start Timer 500ms
        userEvent.type(input, 'pierwszy ')

        jest.advanceTimersByTime(500 - 1)
        expect(searchSpy).not.toHaveBeenCalled()

        // Restart timer 500ms
        userEvent.type(input, 'i ostatni')
        
        jest.advanceTimersByTime(500 - 1)
        expect(searchSpy).not.toHaveBeenCalled()
        
        // 499 + 1 = 500ms - Search!
        jest.advanceTimersByTime(1)

        expect(searchSpy).toHaveBeenCalledWith('pierwszy i ostatni')
        // logRoles(container)
    })


    test.todo('should focus on entry')


})