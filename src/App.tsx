import { BlogComponent } from './components/blog/Blog'
import { Login } from './components/user/Login'

function App() {
  return (
    <>
      <h1>LOGIN:</h1>
      <Login/>
      <h1>BLOGS:</h1>
      <BlogComponent/>
    </>
  )
}

export default App
