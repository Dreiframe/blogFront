import { BlogComponent } from './components/blog/Blog'
import { Login } from './components/user/Login'
import { BlogForm } from './components/blog/BlogForm'

function App() {
  return (
    <>
      <h1>LOGIN:</h1>
      <Login/>

      <h1>CREATE:</h1>
      <BlogForm/>

      <h1>BLOGS:</h1>
      <BlogComponent/>
    </>
  )
}

export default App
