import { useEffect, useState } from 'react'
import blogService from '../../services/blog'

export const BlogForm = () => {
    const [title, setTitle] = useState('create_test')
    const [author, setAuthor] = useState('creatov')
    const [url, setUrl] = useState('create_test.com')

    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()

        blogService
            .createBlog({title: title, author: author, url:url})
            .then(res => {
                console.log('BlogForm: ', res);
                console.log('BLOGS: cannot be updated because the state is in different file...TODO')
            })
            .catch(error => {
                //console.log('bad: ', error.response.data);  
                console.log('BlogForm(error): ', error.response.data);
                
            })
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <p>Title</p>
                    <input
                        type="text"
                        value={title}
                        name="title"
                        onChange={({target}) => setTitle(target.value)}
                    />
                </div>
                <div>
                    <p>Author</p>
                    <input
                        type="text"
                        value={author}
                        name="author"
                        onChange={({target}) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    <p>url</p>
                    <input
                        type="text"
                        value={url}
                        name="url"
                        onChange={({target}) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}