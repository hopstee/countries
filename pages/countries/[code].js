import Head from 'next/head'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Link from '../../components/link.component'
import styles from '../../styles/Home.module.css'
import mapStyles from '../../styles/Map.module.css'
import { getAllCitiesCodes, getSingleCountry, getGeoposition } from '../../libs/countries'
import { useRouter } from 'next/router'
import { useState, useMemo } from "react";

const apiResource = 'https://restcountries.eu/rest/v2'

export async function getStaticPaths() {
    const paths = await getAllCitiesCodes()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const res = await getSingleCountry(params.code)
    const country = await res.json()

    const geoposition = await getGeoposition(country.alpha2Code.toLowerCase(), country.latlng[1], country.latlng[0])

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
                <title>Countries</title>
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
                                        <Link href={`/countries/${border.toLowerCase()}`}>
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