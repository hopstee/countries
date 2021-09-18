import Head from 'next/head'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Link from '../../components/link.component'
import styles from '../../styles/Home.module.css'
import mapStyles from '../../styles/Map.module.css'
import { useRouter } from 'next/router'
import { useState, useMemo } from "react";

const dev = process.env.NODE_ENV !== 'production';
export const server = dev ? 'http://localhost:3000' : process.env.DOMAIN;

export async function getStaticPaths() {
    const paths = []
    const codesResult = await fetch(`${server}/api/getCountriesCodes`)
    const codes = await codesResult.json()

    for(const code of codes) {
        paths.push({
            params: {
                code: code
            }
        })
    }

    return {
        paths,
        fallback: 'blocking'
    }
}

export async function getStaticProps({ params }) {
    const res = await fetch(`${server}/api/getCountry?code=${params.code}`)
    const country = await res.json()

    const geopositionRes = await fetch(`${server}/api/getGeoposition?code=${params.code}`)
    let geoposition = await geopositionRes.json()

    if (geopositionRes == null) {
        geoposition = [
            country.latlng[1] ? country.latlng[1] : 0, 
            country.latlng[0] ? country.latlng[0] : 0
        ]
    }

    return {
        props: {
            country,
            geoposition
        },
    }
}

function Country({ country, geoposition }) {
    const router = useRouter()
    const [isShowMap, setIsHideMap] = useState(false)
    const [lon, lat] = geoposition
    const Map = useMemo(() => dynamic(
        () => import('../../components/map.component'),
        {
            loading: () => <p>Loading...</p>,
            ssr: false,
            style: mapStyles.countryHighlight
        }
    ))

    const showMap = (state) => {
        setIsHideMap(state)
        document.body.style.position = state ? 'fixed' : ''
    }

    return (
        <>
            <Head>
                <title>{country.name}</title>
                <meta name="description" content="Information about all countries" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {isShowMap ? (
                <div className={mapStyles.map_container}>
                    <span className={mapStyles.close_btn} onClick={() => showMap(false)}>
                        <img src="/icons/close.svg" />
                    </span>
                    <Map 
                        lon={lon}
                        lat={lat}
                        country={country}
                    />
                </div>
            ) : ""}

            <main className={styles.description_container}>
                <div className={styles.description}>
                    <div className={styles.top_block}>
                        <button className={styles.button} type="button" onClick={() => router.back()}>
                            <img 
                                src="/icons/arrow-narrow-left.svg"
                                className={styles.icon}
                                />
                            Back
                        </button>
                        <button onClick={() => showMap(true)}>
                                <h1 className={styles.top_block_country}>
                                    <div className={styles.flag}>
                                        <Image
                                            src={country.flag}
                                            layout="fill"
                                        />
                                    </div>
                                    {country.name}
                                    <img 
                                        src="/icons/location-marker.svg"
                                        className={styles.icon}
                                    />
                                </h1>
                        </button>
                    </div>
                    <div className={styles.description_section}>
                        <h1>Main Info</h1>
                        <div className={styles.description_item}>
                            <h2>Capital</h2>
                            <p>{country.capital}</p>
                        </div>
                        <div className={styles.description_item}>
                            <h2>Region</h2>
                            <p>{country.region}</p>
                        </div>
                        <div className={styles.description_item}>
                            <h2>Subregion</h2>
                            <p>{country.subregion}</p>
                        </div>
                        <div className={styles.description_item}>
                            <h2>Population</h2>
                            <p>
                                {
                                    !country.population ? 
                                    (
                                        <p className={styles.code}>
                                            --//--
                                        </p>
                                    ) : (
                                        (country.population).toLocaleString()
                                    )
                                }
                                <img src="/icons/user-group.svg" />
                            </p>
                        </div>
                        <div className={styles.description_item}>
                            <h2>Area</h2>
                            <p>
                                {
                                    !country.area ? 
                                    (
                                        <p className={styles.code}>
                                            --//--
                                        </p>
                                    ) : (
                                        <p>{(country.area).toLocaleString()} &#x33A2;</p>
                                    )
                                }
                                <img src="/icons/globe.svg" />
                            </p>
                        </div>
                        <div className={styles.description_item}>
                            <h2>Regional blocks</h2>
                            <div className={styles.add_info_container}>
                                {
                                    country.regionalBlocs.length > 0 ? 
                                    country.regionalBlocs.map(block => (
                                        <span key={block.acronym}>
                                            {block.name} ( {block.acronym} )
                                        </span>
                                    )) : 
                                    <p className={styles.code}>
                                        --//--
                                    </p>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={styles.description_section}>
                        <h1>Additional Info</h1>
                        <div className={styles.description_item}>
                            <h2>Calling codes</h2>
                            <div className={styles.add_info_container}>
                                {country.callingCodes.map(code => (
                                    <span key={code}>
                                        +{code}
                                        <img 
                                            src="/icons/phone.svg"
                                        />
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className={styles.description_item}>
                            <h2>Borders</h2>
                            <div className={styles.add_info_container}>
                                {
                                    country.borders.length > 0 ? 
                                    country.borders.map(border => (
                                        <Link href={`/countries/${border}`}>
                                            <a key={border}>
                                                {border}
                                                <img 
                                                    src="/icons/arrow-narrow-right.svg"
                                                    className={`${styles.icon} ${styles.link_icon}`}
                                                />
                                            </a>
                                        </Link>
                                    )) : 
                                    <p className={styles.code}>
                                        --//--
                                    </p>
                                }
                            </div>
                        </div>
                        <div className={styles.description_item}>
                            <h2>Timezones</h2>
                            <div className={styles.add_info_container}>
                                {country.timezones.map(timezone => (
                                    <span key={timezone}>
                                        {timezone}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className={styles.description_item}>
                            <h2>Currencies</h2>
                            <div className={styles.add_info_container}>
                                {country.currencies.map(currency => (
                                    <span key={currency.code}>
                                        {currency.name} ( {currency.code} | {currency.symbol} )
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className={styles.description_item}>
                            <h2>Languages</h2>
                            <div className={styles.add_info_container}>
                                {country.languages.map(language => (
                                    <span key={language.name}>
                                        {language.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Country;



// fitness-doza