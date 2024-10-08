import axios from 'axios'

const baseUrl = '/api/blogs'
let token: string|null = null

export interface UserType {
    name: string,
    blogs: BlogType[]
}
  
export interface BlogType {
    author: string,
    blog_id: number,
    likes: number,
    title: string,
    url: string,
    user_id: number
}
  

const setToken = (newToken: string )=> {
    token = `Bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get<UserType[]>(baseUrl)
    return request.then(response => {
        return response.data
    })
}

const deleteBlogById = async (id: number) => {
    const response = await axios.delete(`${baseUrl}/${id}`, {
        headers: {
            'Authorization': token
          }
    })

    return response.data
}

export default { 
    getAll, deleteBlogById, setToken
}

/*
const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { 
    getAll: getAll, 
    create: create, 
    update: update 
}
*/