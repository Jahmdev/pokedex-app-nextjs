import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Anton } from 'next/font/google'
import { Container } from 'react-bootstrap';
import Head from 'next/head';
import "@/styles/search.css";

import Team from '@/components/PokemonTeam';



// Importation de la police de caractère Anton avec les sous-ensembles 'latin' et le poids '400'
const anton = Anton({ subsets: ['latin'], weight: ["400"] })

// Composant principal de l'application Pokédex
export default function App({ Component, pageProps }: AppProps) {
  return (
    // Fragment JSX pour regrouper les éléments
    // En-tête de la page avec les métadonnées
    <>
      <Head>
        
        <title>Pokédex</title>
        <meta name="description" content="Pokédex App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://www.flaticon.com/fr/icone-gratuite/pokemon_1169608" />
      </Head>

      <div>
        <Team />
      </div>

      <div className={anton.className}>
        <main>
          <Container className='py-4'>
            <Component {...pageProps} /> 
          </Container>
        </main>
      </div>
    </>
    
  );
}
