import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'

import blogReducer from './reducers/blogReducer.ts'

const reducer = combineReducers({
    blogs: blogReducer
})

const store = createStore(reducer)

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App />
    </Provider>
)
