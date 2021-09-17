import Head from 'next/head'
import Image from 'next/image'
import Link from '../components/link.component'
import Searchbar from '../components/searchbar.component'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'

function Home() {
    const [countries, setCountries] = useState(null)
    const handleData = async () => {
        const countriesResponse = await fetch("/api/getCountries")
        const countriesResult = await countriesResponse.json()
        const countriesObject = {}
        const a = 97;

        for (let i = 0; i < 26; i++) {
            const l = String.fromCharCode(a + i)
            countriesObject[l] = [];
        }

        for(const country in countriesResult) {
            const alphabetLetter = (countriesResult[country].name[0]).toLowerCase()
            if(!countriesObject.hasOwnProperty(alphabetLetter)) {
                countriesObject[alphabetLetter] = []
            }
            countriesObject[alphabetLetter].push(countriesResult[country])
        }
    
        Object.keys(countriesObject).map(item => {
            if(countriesObject[item].length == 0) {
                delete countriesObject[item]
            }
        })

        setCountries(countriesObject)
    }

    useEffect(() => {
        handleData()
	}, [])

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
                    {!countries ? 
                        (
                            <p className={styles.loading}>
                                Loading...
                            </p>
                        ) : Object.keys(countries).map(letter => (
                        <div className={styles.grid_column} key={letter}>
                            <p className="bg-gray-100 px-4 py-2 rounded-md" key={letter} id={letter}>
                                {letter}
                            </p>
                            <div className={styles.column_body}>
                                {countries[letter].map(country => (
                                    <Link href={`/countries/${country.alpha3Code}`}>
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

export default Home;
