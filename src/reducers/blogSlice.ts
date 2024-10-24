import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

const initialBlogs: SingleBlog[] = [
    {
        user: "string",
        author: "string",
        blog_id: 123123,
        likes: 123123,
        title: "string",
        url: "string",
        user_id: 123123
    },
]

const blogSlice = createSlice({
    name: 'blogs',
    initialState: initialBlogs,
    reducers: {
        setBlogs(_state, action: PayloadAction<SingleBlog[]>){
            //_state because otherwise "state is declared but its value is never read", _ gives exemption
            return action.payload
        },
        addBlog(state, action: PayloadAction<SingleBlog>) {
            return [...state, action.payload]
        },
        likeBlog(state, action: PayloadAction<number>){
            //void because we dont want to directly change the state?..
            const newState = void state.map(blog => {
                if(blog.blog_id === action.payload){
                    let changedBlog = blog
                    changedBlog.likes += 1
                    return changedBlog
                } else {
                    return blog
                }
            })
            return newState
        },
        deleteBlog(state, action: PayloadAction<number>){
            return state.filter(blog => blog.blog_id !== action.payload)
        }
    },
})

export const {setBlogs, addBlog, likeBlog, deleteBlog} = blogSlice.actions

import blogService from '../services/blog'

export const initializeBlogs = () => {
    return async (dispatch: Dispatch) => {
        const blogs = await blogService.getAllUnnested()
        dispatch(setBlogs(blogs))
    }
}

export default blogSlice.reducer