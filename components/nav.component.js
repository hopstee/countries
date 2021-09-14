import Link from './link.component'
import { useEffect, useState, useContext } from "react";
import { useTheme } from "next-themes"
import styles from '../styles/Home.module.css'
import { useSession, signOut } from 'next-auth/client';

function Navigation(props) {

    // const { t } = useTranslation()

    // const [locale, setLocale] = useContext(LanguageContext);
    const { theme, setTheme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);
    const [session] = useSession()
    // const [isOpen, setIsOpen] = useState(false);

    // const settings_block = document.getElementById('settings_block');
    
    const switchTheme = () => {
        if (isMounted) {
            setTheme(theme === "light" ? "dark" : "light");
        }
    };

    // const showLangs = () => {
    //     let langs = document.getElementById('langs');
    //     let settings_block = document.getElementById('settings_block');
    //     settings_block.classList.toggle('right-full');
    //     langs.classList.toggle('left-full');
    // }

    // const switchLang = (lang) => {
    //     if(!window) {
    //         return;
    //     }

    //     localStorage.setItem('lang', lang);
    //     setLocale(lang);
    // }

    useEffect(() => {
        setIsMounted(true);

        if(theme !== "light" && theme !== "dark") {
            setTheme("light");
        }
    }, [session]);

    return (
        <>
            <div className="fixed bottom-0 md:top-0 left-0 h-12 w-full md:w-full z-10 bg-white dark:bg-gray-800 md:border-b md:border-t-0 border-t">
                <div className="h-full w-full flex md:flex-row px-2 md:px-6">
                    <div className="flex flex-row md:flex-row justify-start items-center space-x-1 md:space-x-2 w-full">
                        <Link href="/">
                            <div className={styles.nav_link_container}>
                                <a className={styles.nav_link}>
                                    Countries
                                </a>
                            </div>
                        </Link>
                        <Link href="/about">
                            <div className={styles.nav_link_container}>
                                <a className={styles.nav_link}>
                                    About
                                </a>
                            </div>
                        </Link>
                        {
                            session?.accessToken ? (
                                <div className={styles.nav_link_container}>
                                    <button
                                        className={styles.nav_link}
                                        onClick={() => signOut()}>
                                            Log Out
                                    </button>
                                </div>
                            ) : (
                                ""
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navigation;