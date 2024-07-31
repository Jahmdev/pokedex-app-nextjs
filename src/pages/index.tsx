import PokemonEntry from "@/components/PokemonEntry"; 
import { useRouter } from "next/router"; 
import useSWR from "swr"; 
import * as PokemonApi from "@/network/pokemon-api"; 
import { Button, Col, Row, Spinner } from "react-bootstrap";
import React from "react"; 

export default function Home() { 
  const router = useRouter(); 
  const page = parseInt(router.query.page?.toString() || "1"); // Récupération de la page actuelle à partir de la query string

  // Requête API pour récupérer la liste des Pokémon de la page actuelle
  const { data, isLoading } = useSWR(["getPokemonpage", page], () => PokemonApi.getPokemonPage(page));

  if (isLoading) { // Si la requête est en cours, affichage d'un spinner
    return <Spinner animation="border" className="d-block m-auto"/>;
  }

  return ( // Affichage de la liste des Pokémon
    <div>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-4"> 
        {data?.results.map(pokemonEntry => ( // Boucle sur les résultats de la requête API
          <Col key={pokemonEntry.name}> 
            <PokemonEntry name={pokemonEntry.name}/> 
          </Col>
        ))}
      </Row>

      <div className="d-flex justify-content-center gap-2 mt-4"> 
        {data?.previous && // Si il y a une page précédente, affichage du bouton "Page précédente"
          <Button onClick={() => router.push({ query: { ...router.query, page: page - 1 } })}>
            Page précédente
          </Button>
        }
        {data?.next && // Si il y a une page suivante, affichage du bouton "Page suivante"
          <Button onClick={() => router.push({ query: { ...router.query, page: page + 1 } })}>
            Page suivante
          </Button>
        }  
      </div>
    </div>
  );
}