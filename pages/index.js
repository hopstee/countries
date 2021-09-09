import Head from 'next/head'
import Image from 'next/image'
import Link from '../components/link.component'
import styles from '../styles/Home.module.css'
import ArrowNarrowRightIcon from '../public/icons/arrow-narrow-right.svg'

function Home({ alphabetArray, countriesObject }) {

    return (
        <>
            <Head>
                <title>Countries</title>
                <meta name="description" content="Information about all countries" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.grid_view}>
                    {Object.keys(countriesObject).map(letter => (
                        <div className={styles.grid_column} key={letter}>
                            <p className="bg-gray-100 px-4 py-2 rounded-md">
                                {letter}
                            </p>
                            <div className={styles.column_body}>
                                {countriesObject[letter].map(country => (
                                    <Link href={`/countries/${country.alpha3Code.toLowerCase()}`}>
                                        <a className={styles.link_container} key={country.alpha3Code}>
                                            {country.name}
                                            <img 
                                                src="/icons/arrow-narrow-right.svg"
                                                className={`${styles.icon} ${styles.link_icon}`}
                                            />
                                        </a>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}

export async function getServerSideProps() {
    const res = await fetch('https://restcountries.eu/rest/v2/all')
    const countries = await res.json()
    const alphabetArray = []
    const countriesObject = {}

    for(const country of countries) {
        const alphabetLetter = (country.name[0]).toLowerCase()
        if(!countriesObject.hasOwnProperty(alphabetLetter)) {
            alphabetArray.push(alphabetLetter)
            countriesObject[alphabetLetter] = []
        }
        countriesObject[alphabetLetter].push(country)
    }

    return {
        props: {
            alphabetArray,
            countriesObject,
        },
    }
}

export default Home;
