import { act, render, screen, waitFor } from "@testing-library/react";
import { promises } from "node:dns";
import { useFetch } from "../../core/hooks/useFetch";
import { fetchPlaylists } from "../../core/hooks/usePlaylists";
import { Playlist } from "../../model/Playlist";
import { PlaylistsTDD } from "./PlaylistsTDD";

import { rest } from 'msw'
import { setupServer } from 'msw/node'
import userEvent from "@testing-library/user-event";


// jest.mock("../../core/hooks/usePlaylists")


describe('PlaylistsTDD', () => {

    // https://mswjs.io/docs/getting-started/mocks/rest-api
    const mockPlaylists: Playlist[] = [
        { id: '123', name: 'TestTitle 1', description: '', public: false },
        { id: '234', name: 'TestTitle 2', description: '', public: false },
    ];
    const server = setupServer(
        rest.get('https://api.spotify.com/v1/me/playlists', (req, res, ctx) => {
            ctx.delay(500)
            return res(ctx.json(mockPlaylists))
        }),
        rest.get('https://api.spotify.com/v1/playlists/:playlist_id', (req, res, ctx) => {
            return res(ctx.json(mockPlaylists.find(p => p.id == req.params.playlist_id)))
        })

        // https://mswjs.io/docs/basics/request-matching
        // GET https://api.spotify.com/v1/playlists/:playlist_id
        // req.params.playlist_id

        // PUT https://api.spotify.com/v1/playlists/:playlist_id
        // req.params.playlist_id
    )

    // Enable API mocking before tests.
    beforeAll(() => server.listen())

    // Reset any runtime request handlers we may add during the tests.
    afterEach(() => server.resetHandlers())

    // Disable API mocking after the tests are done.
    afterAll(() => server.close())

    const setup = () => {
        render(<PlaylistsTDD />)
    }

    // RED -> Green -> Refactor -> RED ...
    test('loads and shows a list playlists', async () => {
        // Arrange - Given ... // no playlists

        // Act - When ... // loads playlists
        setup()
        const noItems = screen.queryAllByRole('tab', {})
        expect(noItems).toHaveLength(0)

        // Assert - Then ... // Shows list of playlists
        const items = await screen.findAllByRole('tab', {})

        expect(items).toHaveLength(2)
        expect(items[0]).toHaveTextContent('TestTitle 1')
        expect(items[1]).toHaveTextContent('TestTitle 2')
    })

    // test.todo('shows list of no playlists')

    test('selecting playlist from list loads details', async () => {

        setup()
        const items = await screen.findAllByRole('tab', {})
        // screen.debug()
        userEvent.click(screen.getByText('TestTitle 1', { exact: false}))

        await screen.findByTestId('playlist_name')

    })

    test.todo('clicking edit in details show edit form')

    test.todo('saving form changes updates list and details')

    // test('Function adds numbers', () => {
    //     const add = (x:number, y:number) => 5;

    //     expect(add(2, 3)).toEqual(5)
    // })

    /* 

    
    */
})
