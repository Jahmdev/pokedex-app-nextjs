import usePokemon from "@/hooks/usePokemon"
import Link from "next/link";
import styles from "@/styles/PokemonEntry.module.css"
import { Spinner } from "react-bootstrap";
import Image from "next/image"

// This is the default export of the PokemonEntry component
export default function PokemonEntry({name}: {name:string}){
    // Use the usePokemon hook to get the pokemon data and loading state
    const { pokemon, pokemonLoading} = usePokemon(name);

    // Return a Link component that wraps the pokemon entry
    return(
        <Link href={"/"+ name}>
            
            <div className= {styles.entry}>
                
                {pokemonLoading && <Spinner animation="grow" />}
                
                {pokemon && 
                    <div className={styles.card}>
                        
                        <h1 className="text-center text-capitalize">{pokemon.name}</h1>
                        
                        <Image 
                            src={pokemon.sprites.other["official-artwork"].front_default}
                            alt={"Pokemon: " + pokemon.name}
                            width={200}
                            height={200}
                        />
                    </div>
                }

            </div>
        </Link>
    )
}