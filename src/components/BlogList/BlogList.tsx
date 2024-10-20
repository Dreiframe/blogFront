import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import blogServcie from '../../services/blog'
import { deleteBlog, likeBlog, setBlogs } from "../../reducers/blogReducer"
import styles from './BlogList.module.css'

const BlogList = () => {
    const blogs = useSelector((state: reducerType) => state.blogs)
    const dispatch = useDispatch()


    useEffect(() => {
        blogServcie
            .getAllUnnested()
            .then(resBlogs => {
                dispatch(setBlogs(resBlogs))
            })
    }, [])


    const blogLikeFunction = (id: number) => {
        blogServcie
            .likeBlog(id)
            .then(() => {
                dispatch(likeBlog(id))
            }).catch(error => console.log('BlogList.Like(error):', error))
    }


    const blogDeleteFunction = (id: number) => {
        blogServcie
            .deleteBlogById(id)
            .then(() => {
                dispatch(deleteBlog(id))
            }).catch(error => console.log('BlogList.Delete(error):', error.code))
    }


    interface BlogElementProps {
        blog: SingleBlog
    }
    const BlogElement = ({blog}: BlogElementProps) => {
        return (
            <li className={styles.Blog}>
                <div className={styles.UserColumn}>
                    <p>{blog.user}</p>
                    <p> bid:{blog.blog_id}</p>
                </div>
                <div className={styles.BlogColumn}>
                    <p>Title: </p>
                    <p>{blog.title}</p>
                    <p>Author: </p>
                    <p>{blog.author}</p>
                    <p>Url: </p>
                    <a href=''>{blog.url}</a>
                    <p>Likes:</p>
                    <p>{blog.likes}</p>
                </div>
                <div className={styles.ButtonColumn}>
                    <button onClick={() => blogLikeFunction(blog.blog_id)}>like</button>
                    <button onClick={() => blogDeleteFunction(blog.blog_id)}>delete</button>
                </div>
            </li>
        )   
    }
    
    return (
        <div>
            <ol>
            {blogs.map((blog, key) => {
                return <BlogElement blog={blog} key={key}/>
            })}
            </ol>
        </div>
    )
}


export default BlogList