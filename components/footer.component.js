import Link from './link.component'
import { useState, useRef, useEffect } from "react";
import styles from '../styles/Home.module.css'
import { getCitiesByQuery } from '../libs/countries'

function Footer(props) {
    const getCurrentYear = () => {
        return new Date().getFullYear()
    }

    return (
        <>
            <div className={styles.footer}>
                <p>Copyright © 2021-{getCurrentYear()} Eduard Krivovyashuk</p>
            </div>
        </>
    );
}

export default Footer;