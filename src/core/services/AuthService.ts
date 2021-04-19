
// https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow

interface AuthOptions {
    auth_url: string
    client_id: string
    response_type: 'token'
    redirect_uri: string
    scope?: string
    show_dialog?: string
}

export class AuthService {
    constructor(private options: AuthOptions) { }

    token: string | null = null

    init() {
        // Try to get token from sessionStorage and parse JSON
        try { this.token = JSON.parse(sessionStorage.getItem('token')!) } catch (e) { }

        // Try to get token from browser URL bar
        const p = new URLSearchParams(window.location.hash.slice(1))
        const access_token = p.get('access_token')

        if (access_token) {
            this.token = access_token
            // Save token as JSON to sessionStorage
            sessionStorage.setItem('token', JSON.stringify(this.token))
            // window.location.hash = ''
        }

        // If no token
        if (!this.token) {
            this.login()
        }
    }

    login() {
        // Destructure options, with defaults
        const { client_id,
            redirect_uri,
            response_type,
            scope = '',
            show_dialog = 'false' } = this.options

        // Build URL params string 
        const params = new URLSearchParams({
            client_id,
            redirect_uri,
            response_type,
            scope,
            show_dialog
        })

        // Redirect to Spotify login / authorization page:
        window.location.href = (`${this.options.auth_url}?${params}`)
    }

    logout() { }
}

