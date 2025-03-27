import type { AppProps } from 'next/app';
import { StrapiProvider } from '../components/StrapiProvider';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <StrapiProvider>
            <Component {...pageProps} />
        </StrapiProvider>
    );
}

export default MyApp; 