import Head from 'next/head'
import Image from 'next/image'
import Link from '../components/link.component'
import Searchbar from '../components/searchbar.component'
import styles from '../styles/Home.module.css'
import { getAllRegionalBlocks, getAllRegions, getAllCountries } from '../libs/countries';

const apiResource = 'https://restcountries.eu/rest/v2'

function Home({ countriesObject, regionalBlocks, regions }) {

    return (
        <>
            <Head>
                <title>Countries</title>
                <meta name="description" content="Information about all countries" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Searchbar />
            <main className={styles.main}>
                <div className={styles.grid_view}>
                    {Object.keys(countriesObject).map(letter => (
                        <div className={styles.grid_column} key={letter}>
                            <p className="bg-gray-100 px-4 py-2 rounded-md" key={letter} id={letter}>
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
    const res = await getAllCountries()
    const countries = await res.json()
    const countriesObject = {}
    const regionalBlocks = await getAllRegionalBlocks()
    const regions = await getAllRegions()
    const a = 97;
    
    for (let i = 0; i < 26; i++) {
        countriesObject[String.fromCharCode(a + i)] = [];
    }

    for(const country of countries) {
        const alphabetLetter = (country.name[0]).toLowerCase()
        if(!countriesObject.hasOwnProperty(alphabetLetter)) {
            countriesObject[alphabetLetter] = []
        }
        countriesObject[alphabetLetter].push(country)
    }

    return {
        props: {
            countriesObject,
            regionalBlocks, 
            regions,
        },
    }
}

export default Home;
