import { useState, useEffect } from "react"
import axios from "axios"

interface responseType {
    token: string,
    name: string
}

export const Login = () => {
    const [username, setUsername] = useState('test_user_rest')
    const [password, setPassword] = useState('test_user_password_rest') 

    interface userType {
        name: string,
        token: string
    }

    const [ localUser, setLocalUser ] = useState<userType>({name: 'none', token: 'none'})

    useEffect(() => {
        const blogUserString = window.localStorage.getItem('blogUser') || 'none'
        const blogUserJson: userType = JSON.parse(blogUserString)
        setLocalUser(blogUserJson)
      }, [])

    const handleLogin = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()
        axios.post<responseType>('http://localhost:3003/api/users/login', {
            name: username,
            password: password
        })
            .then(res => {
                //setWebToken(res.data.token)
                window.localStorage.setItem('blogUser', JSON.stringify(res.data))
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }

    if (localUser){
        return(
            <div>
                <p>Logged in as: {localUser.name}</p>
            </div>
        )
    } else {
        return(
            <div>
                <form onSubmit={handleLogin}>
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