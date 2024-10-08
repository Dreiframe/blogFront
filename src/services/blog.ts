import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/blogs'

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
  

const getAll = () => {
    const request = axios.get<UserType[]>(baseUrl)
    return request.then(response => {
        return response.data
    })
}

const deleteBlogById = (id: number) => {
    return axios.delete(`${baseUrl}/${id}`, {
        headers: {
            'Authorization': 'Bearer fefege...'
          }
    })
}

export default { 
    getAll, deleteBlogById,
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