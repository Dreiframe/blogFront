import { useDispatch } from "react-redux"
import { useState } from "react"
import styles from './BlogCreationForm.module.css'
import blogService from '../../services/blog'
//import { addBlog } from "../../reducers/blogReducer"
import { addBlog } from "../../reducers/blogSlice"

const BlogCreationForm = () => {
    const dispatch = useDispatch()

    const [title, setTitle] = useState('create_test')
    const [author, setAuthor] = useState('creatov')
    const [url, setUrl] = useState('create_test.com')

    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()
        blogService
            .createBlog({title: title, author: author, url:url})
            .then(({name, blog}) => {
                const newBlog: SingleBlog = {
                    user: name,
                    author: blog.author,
                    blog_id: blog.blog_id,
                    likes: blog.likes,
                    title: blog.title,
                    url: blog.url,
                    user_id: blog.user_id
                }

                dispatch(addBlog(newBlog))
            })
            .catch(error => {
                console.log('BlogForm(error): ', error.response.data);
            })
    }

    return(
        <div>
            <form onSubmit={handleSubmit} className={styles.BlogFormComponent}>
                <div className={styles.TitleColumn}>
                    <p>Title</p>
                    <input
                        type="text"
                        value={title}
                        name="title"
                        onChange={({target}) => setTitle(target.value)}
                    />
                </div>
                <div className={styles.AuthorColumn}>
                    <p>Author</p>
                    <input
                        type="text"
                        value={author}
                        name="author"
                        onChange={({target}) => setAuthor(target.value)}
                    />
                </div>
                <div className={styles.URLColumn}>
                    <p>url</p>
                    <input
                        type="text"
                        value={url}
                        name="url"
                        onChange={({target}) => setUrl(target.value)}
                    />
                </div>
                <button type="submit" className={styles.FormButton}>
                    Create
                </button>
            </form>
        </div>
    )
}

export default BlogCreationForm