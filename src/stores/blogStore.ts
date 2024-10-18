import { createStore } from 'redux'

interface actions {
    type: "NEW_BLOG" | "DELETE_BLOG",
    payload: UserType,
}

const blogReducer = (state:UserType[] = [], action: actions) => {
    switch(action.type) {
        case "NEW_BLOG":
            return [...state, action.payload]
        
        case "DELETE_BLOG":
            return state

        default:
            return state
    }
}

export const blogStore = createStore(blogReducer)

export const initBlogStore = (blogs: UserType[]) => {
    blogs.map(blog => {
        blogStore.dispatch({
            type: "NEW_BLOG",
            payload: blog
        })
    })
}