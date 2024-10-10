import { useState } from 'react'
import blogService, {UserType} from '../../services/blog'
import styles from './blogform.module.css'

interface BlogFormProps {
    blogs: UserType[],
    setBlogs: React.Dispatch<React.SetStateAction<UserType[]>>
}
export const BlogForm = ({blogs, setBlogs}: BlogFormProps) => {
    const [title, setTitle] = useState('create_test')
    const [author, setAuthor] = useState('creatov')
    const [url, setUrl] = useState('create_test.com')

    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()

        blogService
            .createBlog({title: title, author: author, url:url})
            .then(res => {
                const updatedBlogs = blogs.map(({name, blogs}) => {
                    if(name === res.name){
                        blogs.push(res.blog)
                    }
                    return {name: name, blogs: blogs}
                  })
          
                setBlogs(updatedBlogs)
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