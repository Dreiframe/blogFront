import { useState } from 'react'

import { BlogComponent } from './components/blog/Blog'
import { Login } from './components/user/Login'
import { BlogForm } from './components/blog/BlogForm'

import { UserType } from './services/blog'

function App() {
  const [blogs, setBlogs] = useState<UserType[]>([])

  return (
    <>
      <h1>LOGIN:</h1>
      <Login/>

      <h1>CREATE:</h1>
      <BlogForm blogs={blogs} setBlogs={setBlogs}/>

      <h1>BLOGS:</h1>
      <BlogComponent blogs={blogs} setBlogs={setBlogs}/>
    </>
  )
}

export default App
