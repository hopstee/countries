import styles from '../../styles/Admin.module.css'
import { signIn } from 'next-auth/client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoginStarted, setIsLoginStarted] = useState(false)
    const [loginError, setLoginError] = useState('')
    const router = useRouter()

    useEffect(() => {
        if (router.query.error) {
        setLoginError(router.query.error)
        setUsername(router.query.username)
        }
    }, [router])

    const handleLogin = (e) => {
        e.preventDefault()
        setIsLoginStarted(true)
        signIn('credentials',
            {
                username,
                password,
                callbackUrl: `${window.location.origin}/admin/dashboard`,
                error: () => {
                    setIsLoginStarted(false)
                }
            }
        )
    }

    return (
        <>
            <main className={styles.main}>
                <div className={styles.loginStep}>
                    <form onSubmit={(e) => handleLogin(e)} className={styles.loginForm}>
                        <label htmlFor='loginUsername'>Username</label>
                        <input 
                            id='loginUsername' 
                            type='text' 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            className={loginError ? styles.errorInput : ''} />
                        <span className={styles.error}>{loginError}</span>

                        <label htmlFor='inputPassword'>Password</label>
                        <input 
                            id='inputPassword' 
                            type='password' 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} />

                        <button 
                            type='submit' 
                            disabled={isLoginStarted}
                            className={styles.blueButtonRound}>
                                Log In
                        </button>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Login;
