import instance from './axiosInstance'

const api = async (path: string, option: object) => {
    const response = await instance({
        ...option,
        url: path,
    })

    return response.data
}

export default api
