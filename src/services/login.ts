import axios from 'axios'
const baseUrl = '/api/users'

interface loginType {
    name: string,
    password: string
}

interface loginResponseType {
    token: string,
    name: string
}


const login = async (credentials: loginType) => {
    const request = await axios.post<loginResponseType>(baseUrl + '/login', credentials)
    return request.data
}

export default { login }