import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

import { useState } from 'react'

import { UserType } from '../../services/blog'

import { BlogComponent } from './Blog'
import styles from './blog.module.css'

import { BlogForm } from '../blogForm/BlogForm'
import blogFormStyles from '../blogForm/blogform.module.css'

const initalBlogs:UserType[] = [
    {
        name: "asder",
        blogs: [
            {
                blog_id: 123,
                user_id: 1,
                title: "testing_title",
                author: "testing_author",
                url: "test_url.com",
                likes: 10
            }
        ]
    }
]

describe('<BlogComponent/> Tests', () => {
    const Wrapper = () => {
        //BlogComponent => useEffect => blogService => getAll => baseUrl => vite.ts proxy failure in test mode...
        console.log('######BlogComponent throws an error because of useEffect connection error..######')

        const [blogs, setBlogs] = useState<UserType[]>(initalBlogs)
        return <BlogComponent blogs={blogs} setBlogs={setBlogs}/>
    }


    const WrapperMock = () => {
        //BlogComponent => useEffect => blogService => getAll => baseUrl => vite.ts proxy failure in test mode...
        console.log('######BlogComponent throws an error because of useEffect connection error..######')

        const mockHandler = vi.fn(() => {console.log('mock called. Wrapper2')})
        return <BlogComponent blogs={initalBlogs} setBlogs={mockHandler}/>
    }


    test('renders content', () => {
        render(<Wrapper/>)
        //screen.debug() //prints html    
        const element = screen.getByText('testing_title')
        expect(element).toBeDefined()
    })


    test('renders content v2', () => {
        const { container } =  render(<Wrapper/>)
        //screen.debug()
        const div = container.querySelector('.' + styles.BlogColumn)
        expect(div).toHaveTextContent('testing_title')
    })


    test.skip('clicking the button calls event handler once', async () => {
        const mockHandler = vi.fn(() => {console.log('mock called')})

        render(<BlogComponent blogs={initalBlogs} setBlogs={mockHandler}/>)

        // setBlogs mock wont be called..
        // setBlogs is wrapped inside blogService.likeBlog.then( setBlogs()... )

        const user = userEvent.setup()  
        const button = screen.getByText('like')  
        await user.click(button)
        expect(mockHandler.mock.calls).toHaveLength(1)
    })

})


describe('<BlogForm/> Tests', () => {
    const Wrapper = () => {
        const [blogs, setBlogs] = useState<UserType[]>(initalBlogs)
        return <BlogForm blogs={blogs} setBlogs={setBlogs}/>
    }

    test('renders content', () => {
        const { container } = render(<Wrapper/>)

        const divForm = container.querySelector('.' + blogFormStyles.BlogFormComponent)

        expect(divForm).toHaveTextContent('Title')
        expect(divForm).toHaveTextContent('Author')
        expect(divForm).toHaveTextContent('url')
        expect(divForm).toHaveTextContent('Create')
    })

    test('title input works', async () => {
        const user = userEvent.setup()

        const { container } = render(<Wrapper/>)

        const titleInput = container.querySelector('input[name="title"]')

        //The usual typescript shenanigans.. this has to be done to get the .value
        const initialValue = (titleInput as HTMLInputElement).value

        //querySelector might return null.
        if (titleInput){
            await user.type(titleInput, 'testing')
        } else {
            throw new Error('title input field = null')
        }
        
        expect(titleInput).toHaveValue(initialValue + 'testing')
    })
})