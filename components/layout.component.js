import Navigation from './nav.component'
import Footer from './footer.component';
import styles from '../styles/Home.module.css'

const Layout = ( props ) => {
    return (
        <div>
            <Navigation />
            <div className={styles.container}>
                { props.children }
            </div>
            <Footer />
        </div>  
    );
}

export default Layout;