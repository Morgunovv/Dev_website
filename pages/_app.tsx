import type { AppProps } from 'next/app';
import { StrapiProvider } from '../components/StrapiProvider';
import { Header } from '../components/Header';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <StrapiProvider>
            <Header />
            <main className="main-content">
                <Component {...pageProps} />
            </main>
        </StrapiProvider>
    );
}

export default MyApp; 