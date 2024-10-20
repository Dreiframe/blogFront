interface actionTypeAdd {
    type: "ADD_BLOG"
    payload: SingleBlog
}

interface actionTypeDelete {
    type: "DELETE_BLOG"
    payload: number
}

interface actionTypeLike {
    type: "LIKE_BLOG",
    payload: number
}

interface actionTypeSet {
    type: "SET_BLOGS",
    payload: SingleBlog[]
}

type ActionType = actionTypeAdd | actionTypeDelete | actionTypeLike | actionTypeSet

const blogReducer = (state: SingleBlog[] = [], action: ActionType) => {
    switch(action.type){
        case "ADD_BLOG":
            return [...state, action.payload]

        case "SET_BLOGS":
            return action.payload

        case "LIKE_BLOG":
            return state.map(blog => {
                if(blog.blog_id === action.payload){
                    let changedBlog = blog
                    changedBlog.likes += 1
                    return changedBlog
                } else {
                    return blog
                }
            })

        case "DELETE_BLOG":
            return state.filter(blog => blog.blog_id !== action.payload)

        default:
            return state
    }
}

export const setBlogs = (blogs: SingleBlog[]) => {
    return {
        type: "SET_BLOGS",
        payload: blogs
    }
}

export const likeBlog = (id: number) => {
    return {
        type: "LIKE_BLOG",
        payload: id
    }
}

export const deleteBlog = (id: number) => {
    return {
        type: "DELETE_BLOG",
        payload: id
    }
}

export default blogReducer