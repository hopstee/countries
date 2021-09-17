import styles from '../styles/Home.module.css'

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