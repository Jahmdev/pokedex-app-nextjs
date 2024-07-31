import useSWR from "swr"
import * as PokemonApi from "@/network/pokemon-api";
import { AxiosError } from "axios";


 //Hook pour récupérer les données d'un Pokémon à partir de son nom.
 
export default function usePokemon(name: string) {
    /*
      Utilisation de la bibliothèque SWR pour gérer les données et le chargement.
      Le premier argument est la clé de cache, qui est le nom du Pokémon dans ce cas.
      Le deuxième argument est une fonction asynchrone qui récupère les données du Pokémon.
    */
    const { data, isLoading, mutate } = useSWR(name, async () => {
      try {
        // Appel à l'API Pokémon pour récupérer les données du Pokémon.
        return await PokemonApi.getPokemon(name);
      } catch (error) {
        /*
          Si l'erreur est une instance de AxiosError et que le statut de la réponse est 404,
          cela signifie que le Pokémon n'a pas été trouvé, donc on retourne null.
        */
        if (error instanceof AxiosError && error.response?.status === 404) {
          return null;
        } else {
          // Sinon, on relance l'erreur pour qu'elle soit traitée par le caller.
          throw error;
        }
      }
    });
  
    //Retourne un objet contenant les données du Pokémon, un indicateur de chargement et une fonction pour mettre à jour les données.
    return {
      pokemon: data,
      pokemonLoading: isLoading,
      mutatePokemon: mutate,
    };
  }