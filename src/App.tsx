import { Login } from './components/user/Login'

import BlogCreationForm from './components/BlogCreationForm/BlogCreationForm'
import BlogList from './components/BlogList/BlogList'

import { useEffect } from 'react'
import { initializeBlogs } from './reducers/blogSlice'
import { useAppDispatch } from './main'
//import { ToggleMain } from './components/practice/ToggleMain'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, []) 

  return (
    <>
      <h1>LOGIN:</h1>
      <Login/>

      <h1>CREATE:</h1>
      <BlogCreationForm/>

      <h1>BLOGS:</h1>
      <BlogList/>
    </>
  )
}

export default App

/*
    <h1>TEST:</h1>
    <ToggleMain/>
*/