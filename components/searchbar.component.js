import Link from './link.component'
import { useState, useRef, useEffect } from "react";
import styles from '../styles/Home.module.css'
import { getCitiesByQuery } from '../libs/countries'

function Searchbar(props) {
    const [searchResult, setSearchResult] = useState([{name: "Start typing...", link: ''}]);
    const [searchResultVisability, setSearchResultVisability] = useState(false)
    const searchRef = useRef(null)

    const onChange = async (event) => {
        const query = event.target.value

        if(query.length > 0) {
            const result = await getCitiesByQuery(query)

            if(result.length == 0) {
                setSearchResult([{name: "No result...", link: ''}])
            } else {
                setSearchResult(result)
            }
        } else {
            setSearchResult([{name: "Start typing...", link: ''}])
        }
    };

    const onFocus = () => {
        setSearchResultVisability(true)
        window.addEventListener('click', onClick)
    };

    const onClick = (event) => {
        if(searchRef.current && !searchRef.current.contains(event.target)) {
            closeSearchResult(event)
        }
    }

    const closeSearchResult = () => {
        setSearchResultVisability(false)
        window.removeEventListener('click', onClick)
    }

    // useEffect(() => {
    //     window.addEventListener('keyup', (event) => {
    //         if(event.key === "Escape") {
    //             console.log(searchRef.current)
    //             searchRef.current.blur()
    //             closeSearchResult()
    //         }
    //     })
    // })

    return (
        <>
            <div className="md:mt-16 py-6 md:py-8 md:px-6 w-full md:w-full bg-white">
                <div className="relative" ref={searchRef}>
                    <input 
                        className={styles.input} 
                        placeholder="Search..."
                        onFocus={onFocus}
                        onChange={onChange}
                    />
                    {searchResultVisability && (
                    <div className={styles.search_result_container}>
                        <ul className={styles.search_result}>
                            {searchResult.map(item => (
                                item.link.length == 0 ? (
                                    <li className={styles.result_item}>
                                        {item.name}
                                    </li>
                                ) : (
                                    <Link href={item.link}>
                                        <a key={item.name}>
                                            <li className={styles.result_item}>
                                                {item.name}
                                            </li>
                                        </a>
                                    </Link>
                                )
                            ))}
                        </ul>
                    </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Searchbar;