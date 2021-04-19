import { AuthService } from "./AuthService";

export const auth = new AuthService({
    auth_url: 'https://accounts.spotify.com/authorize',
    client_id: '145df2ed82034af5b08e928c183b6d00',
    redirect_uri: 'http://localhost:3000/',
    response_type: 'token',
    scope: '',
    show_dialog: 'true'
});

auth.init()

// Spotify:
    // holoyis165 @ bulkbye . com
    // placki 777
