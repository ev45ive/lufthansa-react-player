import { AuthService } from "./AuthService"
import { makeAuthTokenInterceptor } from "./authTokenRequestInterceptor"

test('interceptor should add Authorization token from auth service', () => {
    const FAKETOKEN = 'ala ma kota'
    const interceptor = makeAuthTokenInterceptor({
        token: FAKETOKEN
    })

    const result = interceptor({ headers: {} })

    expect(result).toEqual({
        headers: {
            // 'Authorization': expect.stringMatching('Bearer null')
            'Authorization': 'Bearer ' + FAKETOKEN
        }
    })
})

test('interceptor should NOT add Authorization when no token', () => {

    const interceptor = makeAuthTokenInterceptor({
        token: null
    } as AuthService)

    const result = interceptor({ headers: {} })

    expect(result).not.toMatchObject({
        headers: { 'Authorization': expect.anything() }
    })
})
