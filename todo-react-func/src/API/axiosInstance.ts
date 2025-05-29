import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:4000',
    withCredentials: true,
    // headers: {
    //     'Content-Type': 'application/json',
    // },
    // timeout: 1000,
})

instance.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config

        if (
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._isRetry &&
            !['users/login', 'users/registration'].includes(originalRequest.url)
        ) {
            try {
                originalRequest._isRetry = true
                const response = await instance.post('/refresh')

                if (response.status === 401) {
                    return Promise.reject(new Error('Refresh failed'))
                }

                
                return instance(originalRequest)
            } catch (refreshError) {
                console.error('Refresh token failed', refreshError)

                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    },
)

export default instance
