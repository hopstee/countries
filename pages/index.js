import Head from 'next/head'
import Image from 'next/image'
import Link from '../components/link.component'
import Searchbar from '../components/searchbar.component'
import styles from '../styles/Home.module.css'
import { getAllCountries } from '../libs/countries';

function Home({ countriesObject, alphabetArray }) {

    return (
        <>
            <Head>
                <title>Countries</title>
                <meta name="description" content="Information about all countries" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Searchbar />
            <main className={styles.main}>
                {/* <div className={styles.alphabet_navigation}>
                    {
                        alphabetArray.map(item => (
                            <span>{item}</span>
                        ))
                    }
                </div> */}
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
    let countriesObject = {}
    const alphabetArray = []
    const a = 97;
    
    for (let i = 0; i < 26; i++) {
        const l = String.fromCharCode(a + i)
        countriesObject[l] = [];
        alphabetArray.push(l)
    }

    for(const country of countries) {
        const alphabetLetter = (country.name[0]).toLowerCase()
        if(!countriesObject.hasOwnProperty(alphabetLetter)) {
            countriesObject[alphabetLetter] = []
            alphabetArray.push(alphabetLetter)
        }
        countriesObject[alphabetLetter].push(country)
    }

    Object.keys(countriesObject).map(item => {
        if(countriesObject[item].length == 0) {
            delete countriesObject[item]
        }
    })

    return {
        props: {
            countriesObject,
            alphabetArray,
        },
    }
}

export default Home;
