import { useEffect, useState } from 'react'
import axios from 'axios'

interface UserType {
  name: string,
  blogs: BlogType[]
}

interface BlogType {
  author: string,
  blog_id: number,
  likes: number,
  title: string,
  url: string,
  user_id: number
}

interface Props {
  users: UserType[]
}


const Testing = ({users}: Props)=> {
  if(users === undefined){
    return(
      <>
        <p>UNDEFINDED</p>
      </>
    )
  }

  return(
    <>
      <ul>
        {users.map(user => (
          user.blogs.map(blog => (
            <li key={blog.blog_id}>User:{user.name} Blog:{blog.title}, {blog.author}, {blog.url}</li>
          ))
        ))}
      </ul>
    </>
  )
}


function App() {
  const [blogs, setBlogs] = useState<UserType[]>([])

  useEffect(() => {
    axios.get<UserType[]>('http://localhost:3003/api/blogs').then(result => {
      setBlogs(result.data)
    })
  }, [])


  /*
  useEffect(() => {
    blogs.map(asd => {console.log(asd)})
  }, [blogs])
  */

  return (
    <>
      <h1>HEADER:</h1>
      <Testing users={blogs}/>
    </>
  )
}

export default App
