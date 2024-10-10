import { useEffect } from 'react'
import blogService, { BlogType, UserType } from '../../services/blog'
import styles from './blog.module.css'

//#######################Main Blog Component##########################
interface BlogComponentProps {
  blogs: UserType[],
  setBlogs: React.Dispatch<React.SetStateAction<UserType[]>>
}
export const BlogComponent = ({blogs, setBlogs}: BlogComponentProps) => {
  useEffect(() => {
    blogService.getAll().then(result => {
      setBlogs(result)
    }).catch((error)=>{console.log('Blog useEffect(error:) ', error.response)})
  }, [])

  const likeFunc = (blog: BlogType) => {
    blogService
      .likeBlog(blog.blog_id)
      .then(() => {
        const updatedBlogs = blogs.map(({name, blogs}) => {
          const filteredBlogs = blogs.map((blogFilter) => {
            if (blogFilter.blog_id === blog.blog_id){
              blogFilter.likes += 1
            }

            return blogFilter
          })
          return {name: name, blogs: filteredBlogs}
        })

        setBlogs(updatedBlogs)
      })
      .catch(err => {
        console.log(err.response)
      })
  }
  
  const deleteFunc = (blog: BlogType) => {
    blogService
      .deleteBlogById(blog.blog_id)
      .then(() => {
        const updatedBlogs = blogs.map(({name, blogs}) => {
          const filteredBlogs = blogs.filter((blogFilter) => {
            return blogFilter.blog_id !== blog.blog_id
          })
          return {name: name, blogs: filteredBlogs}
        })

        setBlogs(updatedBlogs)
      })
      .catch(error => {
        console.log('Blog deleteFunc(error): ', error.response.data)
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
          <p> bid:{blog.blog_id}</p>
        </div>
        <div className={styles.BlogColumn}>
          <p>Title: {blog.title}</p>
          <p>Author: {blog.author}</p>
          <p>Url: {blog.url}</p>
          <p>Likes:{blog.likes}</p>
        </div>
        <div className={styles.ButtonColumn}>
          <button onClick={() => likeFunc(blog)}>like</button>
          <button onClick={() => deleteFunc(blog)}>delete</button>
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

  return(
    <div className={styles.BlogComponent}>
      <Blogs userBlogs={blogs}/>
    </div>
  )
}