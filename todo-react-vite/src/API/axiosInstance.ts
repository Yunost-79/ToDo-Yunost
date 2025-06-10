import axios from 'axios'
import { PATHS } from '../globalVariables/pathsVariables'

const instance = axios.create({
    baseURL: 'http://localhost:4000',
    withCredentials: true,
})

instance.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config

        if (
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._isRetry &&
            !['/users/login', '/users/registration', '/users/login', '/refresh'].includes(
                originalRequest.url,
            )
        ) {
            try {
                originalRequest._isRetry = true
                const response = await instance.post('/refresh')

                if (response.status === 401) {
                    window.location.href = PATHS.SIGN_IN

                    return Promise.reject(new Error('Refresh failed'))
                }

                return instance(originalRequest)
            } catch (refreshError) {
                window.location.href = PATHS.SIGN_IN

                console.error('Refresh token failed', refreshError)

                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    },
)

export default instance
