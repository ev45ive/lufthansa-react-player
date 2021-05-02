import { render, screen } from "@testing-library/react";
import { MusicSearchView } from "./MusicSearchView";
import * as useSearchAlbums from '../../core/hooks/useSearchAlbums'

function mocked<F extends (...args: any) => any>(mock: F) {
    return mock as unknown as jest.Mock<ReturnType<F>, Parameters<F>>
}


jest.mock('../../core/hooks/useSearchAlbums')
/* , () => ({
    useFetch() { return [{}] }
}) )*/

describe.only('MusicSearchView', () => {
    const setup = ({
        results = undefined as any,
        isLoading = false,
        message = ''
    }) => {
        const setQuerySpy = jest.fn();

        mocked(useSearchAlbums.useFetch).mockReturnValue([{
            results, isLoading, message
        }, setQuerySpy]);
        render(<MusicSearchView />)

        return { setQuerySpy }
    }

    test('should show no results', () => {
        setup({})

        expect(document.querySelector('.alert-danger')).toBeNull()
        expect(screen.queryByText('Loading')).toBeNull()
        expect(screen.queryByTestId('search-results')).toBeNull()
    })

    test('should show results', () => {
        setup({
            results: []
        })

        expect(document.querySelector('.alert-danger')).toBeNull()
        expect(screen.queryByText('Loading')).toBeNull()
        expect(screen.queryByTestId('search-results')).not.toBeNull()
    })

})
