import '../styles/globals.css';
import type { AppProps } from 'next/app';
// 全面的にFirebaseを使うので、pages/_app.tsxで初期化しておく。
import '../libs/firebase/config';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
