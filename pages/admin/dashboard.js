
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../../styles/Admin.module.css'

function Dashboard() {
    const [session, loading] = useSession()
    const [isUpdating, setIsUpdating] = useState(false)
    const [updateData, setUpdateData] = useState(null)
	const router = useRouter()


    const handleData = async () => {
        const updateDataResponse = await fetch("/api/getUpdateData")
        const updateDataResult = await updateDataResponse.json()
        setUpdateData(updateDataResult)
    }

    const updateDataHandler = async () => {
        setIsUpdating(true)
        const result = await fetch("/api/updateCountriesData")
        const resultData = await result.json()
        setUpdateData({"last_update": resultData.last_update})
        setIsUpdating(false)
    }

	useEffect(() => {
		if(!loading && !session?.accessToken) {
			router.push('/admin/login')
		}

        handleData()
	}, [loading, session])

    return (
        <>
            <Head>
                <title>Dashboard</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className={styles.dashboard_container}>
                    <h1 className={styles.title}>Dashboard</h1>
                    <div className={styles.dashboard_item}>
                        <p>Last update: { updateData?.last_update }</p>
                        <button onClick={updateDataHandler} disabled={isUpdating ? "disbled" : ""}>
                            {
                                isUpdating ? "Updating..." : "Update"
                            }
                        </button>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Dashboard;