const accessTokenKey = 'access-token'
const refreshTokenKey = 'refresh-token'

export const setAccessToken = (accessToken) => {
    localStorage.setItem(
        accessTokenKey,accessToken
    )
}

export const getAccessToken = () => {
    return localStorage.getItem(
        accessTokenKey
    )
}

export const removeAccessToken = () => {
    localStorage.removeItem(
        accessTokenKey
    )
}