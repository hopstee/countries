import Link from './link.component'
import { useEffect, useState, useContext } from "react";
import { useTheme } from "next-themes"
import styles from '../styles/Home.module.css'

function Navigation(props) {

    // const { t } = useTranslation()

    // const [locale, setLocale] = useContext(LanguageContext);
    const { theme, setTheme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);
    // const [isOpen, setIsOpen] = useState(false);

    // const settings_block = document.getElementById('settings_block');
    
    const switchTheme = () => {
        if (isMounted) {
            setTheme(theme === "light" ? "dark" : "light");
        }
    };

    const handleModal = () => {
        setIsOpen(!isOpen);
    }

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
    }, []);

    return (
        <>
            <div className="fixed bottom-0 md:top-0 left-0 h-12 w-full md:w-full z-10 bg-white dark:bg-gray-900 md:border-b md:border-t-0 border-t">
                <div className="md:h-full w-full flex md:flex-row py-3 px-6">
                    <div className="flex flex-row md:flex-row justify-start space-x-6 w-full">
                        <Link href="/">
                            <a className={styles.nav_link}>
                                Countries
                            </a>
                        </Link>
                        <Link href="/about">
                            <a className={styles.nav_link}>
                                About
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navigation;