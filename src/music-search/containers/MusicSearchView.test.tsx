import { act, render, screen } from "@testing-library/react";
import { MusicSearchView } from "./MusicSearchView";
import { useSearchAlbums, fetchAlbums } from '../../core/hooks/useSearchAlbums'
import { mocked } from 'ts-jest/utils'

// function mocked<F extends (...args: any) => any>(mock: F) {
//     return mock as unknown as jest.Mock<ReturnType<F>, Parameters<F>>
// }

type Mocked<T extends (...args: any) => any> = jest.Mock<ReturnType<T>, Parameters<T>>


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

        // expect(useSearchAlbums as jest.Mock<ReturnType<typeof useSearchAlbums>, Parameters<typeof useSearchAlbums>>)
        // (useSearchAlbums as Mocked<typeof useSearchAlbums>)
        // mocked(useSearchAlbums).mockReturnValue({ results, isLoading, message, searchAlbums: setQuerySpy });
        mocked(fetchAlbums).mockResolvedValue(results);
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
            results: [1, 2, 3]
        })

        expect(document.querySelector('.alert-danger')).toBeNull()
        expect(screen.queryByText('Loading')).toBeNull()
        
        screen.findByTestId('search-results')
    })

})
