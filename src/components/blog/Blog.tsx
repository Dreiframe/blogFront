import { useEffect, useState } from 'react'
import blogService, { BlogType, UserType } from '../../services/blog'
import styles from './blog.module.css'
import axios from 'axios'

const likeFunc = () => {
  console.log('liked')
}

const deleteFunc = (blog_id: number) => {
  blogService
    .deleteBlogById(blog_id)
    .then(result => {
      console.log(result)
    })
    .catch(error => {
      console.log(error.response.data)
    })
}


//#######################Individual Blog############################
interface BlogProps {
  username: string
  blog: BlogType
}
const Blog = ({blog, username}: BlogProps) => {
  return(
    <li className={styles.Blog}>
      <div className={styles.UserColumn}>
        <p>{username}</p>
      </div>
      <div className={styles.BlogColumn}>
        <p>Title: {blog.title}</p>
        <p>Author: {blog.author}</p>
        <p>Url: {blog.url}</p>
        <p>Likes:{blog.likes}</p>
      </div>
      <div className={styles.ButtonColumn}>
        <button onClick={likeFunc}>like</button>
        <button onClick={() => deleteFunc(blog.blog_id)}>delete</button>
      </div>
    </li>
  )
}


//#######################Multiple Blogs#############################
interface BlogsProps {
  userBlogs: UserType[]
}
const Blogs = ({userBlogs}: BlogsProps)=> {
  if(userBlogs === undefined){
    return(
      <>
        <p>No blogs...</p>
      </>
    )
  }

  return(
    <ul className={styles.Blogs}>
      {userBlogs.map(user => (
        user.blogs.map(blog => (
          <Blog blog={blog} username={user.name} key={blog.blog_id}/>
        ))
      ))}
    </ul>
  )
}


//#######################Main Blog Component##########################
export const BlogComponent = () => {
  const [blogs, setBlogs] = useState<UserType[]>([])

  useEffect(() => {
    blogService.getAll().then(result => {
      setBlogs(result)
    })
  }, [])

  return(
    <div className={styles.BlogComponent}>
      <Blogs userBlogs={blogs}/>
    </div>
  )
}