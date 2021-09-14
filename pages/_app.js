import ProgressBar from '@badrap/bar-of-progress'
import Router from 'next/router'
import { ThemeProvider } from 'next-themes'
import { Provider } from 'next-auth/client'
import Layout from '../components/layout.component'
import '../styles/globals.css'

const progress = new ProgressBar({
    size: 3,
    className: "bg-blue-500",
    delay: 100
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }) {
    return (
        <Provider session={pageProps.session}>
            <ThemeProvider attribute="class">
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </Provider>
    )
}

export default MyApp
