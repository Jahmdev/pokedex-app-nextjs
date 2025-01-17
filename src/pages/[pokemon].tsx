import { useRouter } from "next/router";

import Head from "next/head";
import Link from "next/link";
import { Button, Form, Spinner } from "react-bootstrap";
import Image from "next/image";
import usePokemon from "@/hooks/usePokemon";




export default function PokemonDetailsPage() {
  const router = useRouter();
  const pokemonName = router.query.pokemon?.toString() || "";
  const { pokemon, pokemonLoading, mutatePokemon } = usePokemon(pokemonName);

  const handleImageError = () => {
    return (
      <Image
        src="/static/images/pokemon-placeholder.png"
        alt="Pokemon placeholder"
        width={400}
        height={400}
      />
    );
  };

  return (
    <>
      <Head>
        {pokemon && <title>{`${pokemon.name}`} - Pokédex</title>}
      </Head>
      
      <div className="d-flex flex-column align-items-center">
        {pokemonLoading && <Spinner animation="grow" />}
        {pokemon === null && <p>Pokemon not found</p>}
        {pokemon && (
          <>
            <h1 className="text-center text-capitalize">{pokemon.name}</h1>
            <Image
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={"Pokemon: " + pokemon.name}
              width={400}
              height={400}
              onError={handleImageError}
            />
            <div className="d-table bg-info p-4 mt-2">
            <div>
                <strong>Stats:</strong>
                <ul>
                {pokemon.stats.map((stat: any) => (
                <li key={stat.stat.name}>{stat.stat.name} = {stat.base_stat}</li>
                ))}
                </ul>
            </div>
              <div>
                <strong>Types:</strong> {pokemon.types.map(type => type.type.name).join(" ,   ")}
              </div>
              <div>
                <strong>Height:</strong> {pokemon.height * 10} cm 
              </div>
              <div>
                <strong>Weight:</strong> {pokemon.weight / 10} kg
              </div>
              <div>
                <strong>Moves:</strong> {pokemon.moves.map(move => move.move.name).join(" ,   ")}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}