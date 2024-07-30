// components/PokemonList.tsx
import React from 'react';
import { Pokemon } from '@/models/pokemon';

interface PokemonListProps {
  pokemons: Pokemon[];
  onSelectPokemon: (pokemon: Pokemon) => void;
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons, onSelectPokemon }) => {
  return (
    <div>
      <h2>Pokémon List</h2>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.name}>
            <span>{pokemon.name}</span>
            <button onClick={() => onSelectPokemon(pokemon)}>Select</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;