declare interface UserType {
    name: string,
    blogs: BlogType[]
}

declare interface BlogType {
    author: string,
    blog_id: number,
    likes: number,
    title: string,
    url: string,
    user_id: number
}

declare interface SingleBlog {
    user: string
    author: string,
    blog_id: number,
    likes: number,
    title: string,
    url: string,
    user_id: number
}