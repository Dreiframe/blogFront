import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

import { useState } from 'react'

import { UserType } from '../../services/blog'
import { BlogComponent } from './Blog'

describe('blogs tests', () => {
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

    const Wrapper = () => {
        const [blogs, setBlogs] = useState<UserType[]>(initalBlogs)
        return <BlogComponent blogs={blogs} setBlogs={setBlogs}/>
    };


    test('renders content', () => {
    
        render(<Wrapper/>)
    
        //screen.debug() //prints html
    
        const element = screen.getByText('testing_title')
        expect(element).toBeDefined()
    })


    test('clicking the button calls event handler once', async () => {
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