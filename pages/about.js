import Head from 'next/dist/shared/lib/head';
import styles from '../styles/Home.module.css'

function About() {
    return (
        <>
            <Head>
                <title>About</title>
                <meta name="description" content="About source" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.center}>
                    <p className="mb-4">
                        Information resource about the countries of the world.
                    </p>
                    <p className="mb-4">
                        Data source: <a target="blank" href="https://restcountries.eu" className={styles.link}>restcountries.eu</a>
                    </p>
                    <p className="mb-4">
                        Developer: Krivovyashuk Edik   
                    </p>
                    <p className="mb-4">
                        GitHub: <a target="blank" href="https://github.com/hopstee" className={styles.link}>hopstee</a>
                    </p>
                </div>
            </main>
        </>
    )
}

export default About;
