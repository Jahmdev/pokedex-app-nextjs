import { Pokemon, PokemonPage } from "@/models/pokemon";
import api from "./axiosinstance";

export async function getPokemon(name:string){
    const response = await api.get<Pokemon>("/pokemon/" + name);
    return response.data;
}

export async function getPokemonPage(page: number){
    const pageSize = 12;
    const response = await api.get<PokemonPage>('/pokemon?limit=${pageSize}&offset=${pageSize * (page - 1)}');
    return response.data;
}