import { Pokemon, PokemonPage } from "@/models/pokemon";
import api from "./axiosinstance";

// Fonction asynchrone pour récupérer un pokémon par son nom
export async function getPokemon(name: string) {
    // Ajout d'un délai de 1 seconde pour éviter les requêtes trop fréquentes
    const delay = 1000;
    await new Promise(r => setTimeout(r, delay));
    // Requête GET pour récupérer le pokémon correspondant au nom
    const response = await api.get<Pokemon>("/pokemon/" + name);
    // Renvoi des données du pokémon
    return response.data;
  }
  
  // Fonction asynchrone pour récupérer une page de pokémons
  export async function getPokemonPage(page: number) {
    // Taille de la page (12 pokémons par page)
    const pageSize = 12;
    // Requête GET pour récupérer la page de pokémons correspondante
    const response = await api.get<PokemonPage>(`/pokemon?limit=${pageSize}&offset=${pageSize * (page - 1)}`);
    // Renvoi des données de la page de pokémons
    return response.data;
  }
  
  // Fonction asynchrone pour définir un surnom pour un pokémon
  export async function setNickname(pokemon: Pokemon, nickname: string) {
    // Crée un nouvel objet pokémon avec le surnom mis à jour
    return { ...pokemon, name: nickname };
  }
  