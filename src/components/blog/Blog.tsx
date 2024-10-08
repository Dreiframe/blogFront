import { useEffect, useState } from 'react'
import blogService, { BlogType, UserType } from '../../services/blog'
import styles from './blog.module.css'


//#######################Main Blog Component##########################
export const BlogComponent = () => {
  const [blogs, setBlogs] = useState<UserType[]>([])

  useEffect(() => {
    blogService.getAll().then(result => {
      setBlogs(result)
    })
  }, [])

  const likeFunc = () => {
    console.log('liked')
  }
  
  const deleteFunc = (blog: BlogType) => {
    blogService
      .deleteBlogById(blog.blog_id)
      .then(result => {
        //console.log('OLD_BLOGS: ', blogs)
        //blog deletion works with propper name, pass but it does not update the page
        /*
        const updatedBlogs: UserType[] = blogs.map(({name, blogs}) => {
          blogs.filter((blogFilter) => {
            blogFilter.blog_id === blog.blog_id
        })
        })
        */
        const updatedBlogs = blogs.map(({name, blogs}) => {
          const filteredBlogs = blogs.filter((blogFilter) => {
            return blogFilter.blog_id !== blog.blog_id
          })
          return {name: name, blogs: filteredBlogs}
        })

        setBlogs(updatedBlogs)
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
          <p>, bid:{blog.blog_id}</p>
        </div>
        <div className={styles.BlogColumn}>
          <p>Title: {blog.title}</p>
          <p>Author: {blog.author}</p>
          <p>Url: {blog.url}</p>
          <p>Likes:{blog.likes}</p>
        </div>
        <div className={styles.ButtonColumn}>
          <button onClick={likeFunc}>like</button>
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