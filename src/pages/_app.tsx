import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Anton } from 'next/font/google'
import { Container } from 'react-bootstrap';
import Head from 'next/head';
import "@/styles/search.css";

import Team from '@/components/PokemonTeam';



const anton = Anton({ subsets: ['latin'], weight: ["400"] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pokédex</title>
        <meta name="description" content="Pokédex App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Team />
      </div>

      <div className={anton.className}>
        <main>
          <Container className= 'py-4'>
            <Component {...pageProps} /> 
          </Container>
        </main>
      </div>
    
  

    </>
    
  );
}
