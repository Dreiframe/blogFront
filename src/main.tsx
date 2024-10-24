import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import { Provider, useSelector, useStore, useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import blogSlice from './reducers/blogSlice.ts'

const store = configureStore({
    reducer: {
        blogs: blogSlice
    }
})


//#################Typescript Redux Setup####################################
// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()
//###########################################################################

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App />
    </Provider>
)
