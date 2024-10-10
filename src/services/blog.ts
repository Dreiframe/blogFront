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

export interface postBlogType {
    title: string,
    author: string,
    url: string
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

const createBlog = async (newBlog: postBlogType) => {
    const response = await axios.post(baseUrl, newBlog,{
        headers: {
            'Authorization': token
        },
    })

    return response.data
}

const likeBlog = async (likeId: number) => {
    const response = await axios.post(`${baseUrl}/like/${likeId}`)
    return response.data
}

export default { 
    getAll, deleteBlogById, setToken, createBlog, likeBlog
}

/*
const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { 
    getAll: getAll, 
    create: create, 
    update: update 
}
*/