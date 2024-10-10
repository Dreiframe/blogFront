import { useState, useEffect } from "react"
import loginService from '../../services/login'
import blogService from '../../services/blog'
import styles from './login.module.css'


export const Login = () => {
    const [username, setUsername] = useState('test_user_rest')
    const [password, setPassword] = useState('test_user_password_rest') 

    interface userType {
        name: string,
        token: string
    }

    const [ localUser, setLocalUser ] = useState<userType | null>(null)

    //On page load/reload check if user auth is already stored locally
    //Token will expire at somepoint with unclarity to frontend and user..
    useEffect(() => {
        const blogUserString = window.localStorage.getItem('blogUser')
        if(blogUserString){
            const blogUserJson: userType = JSON.parse(blogUserString)
            blogService.setToken(blogUserJson.token)
            setLocalUser(blogUserJson)
        }
    }, [])

    const handleLogin = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()
        loginService
            .login({
                name: username,
                password: password
            })
            .then(res => {
                window.localStorage.setItem('blogUser', JSON.stringify(res))
                blogService.setToken(res.token)
                setLocalUser(res)
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }

    const logout = () => {
        window.localStorage.clear()
        setLocalUser(null)
    }


    if (localUser){
        return(
            <div className={styles.LoginForm}>
                <p>Logged in as: {localUser.name}</p>
                <button onClick={logout}>logout</button>
            </div>
        )
    } else {
        return(
            <div>
                <form onSubmit={handleLogin} className={styles.LoginForm}>
                    <div>
                        <input
                            type="text"
                            value={username}
                            name="username"
                            onChange={({target}) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            name="password"
                            onChange={({target}) => setPassword(target.value)}
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}