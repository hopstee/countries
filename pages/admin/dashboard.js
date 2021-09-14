
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import styles from '../../styles/Admin.module.css'

function Dashboard() {
    const [session, loading] = useSession()
	const router = useRouter()

	useEffect(() => {
		if(!loading && !session?.accessToken) {
			router.push('/admin/login')
		}
	}, [loading, session])

    return (
        <>
            <main className={styles.main}>
                Dashboard
            </main>
        </>
    )
}

export default Dashboard;