    // components/PokemonTeam.tsx
import React, { useState } from 'react';
import { Pokemon } from '@/models/pokemon';

interface PokemonTeamProps {
  pokemons: Pokemon[];
  onSelectPokemon: (pokemon: Pokemon) => void;
  onRemovePokemon: (pokemon: Pokemon) => void;
}

const PokemonTeam: React.FC<PokemonTeamProps> = ({
  pokemons,
  onSelectPokemon,
  onRemovePokemon,
}) => {
  const [team, setTeam] = useState<Pokemon[]>([]);

  const handleAddPokemon = (pokemon: Pokemon) => {
    if (team.length < 6) {
      setTeam([...team, pokemon]);
      onSelectPokemon(pokemon);
    }
  };

  const handleRemovePokemon = (pokemon: Pokemon) => {
    setTeam(team.filter((p) => p.name !== pokemon.name));
    onRemovePokemon(pokemon);
  };

  return (
    <div>
      <h2>My Pokémon Team</h2>
      <ul>
        {team.map((pokemon) => (
          <li key={pokemon.name}>
            <span>{pokemon.name}</span>
            <button onClick={() => handleRemovePokemon(pokemon)}>Remove</button>
          </li>
        ))}
      </ul>
      {pokemons.map((pokemon) => (
        <button key={pokemon.name} onClick={() => handleAddPokemon(pokemon)}>
          Add {pokemon.name}
        </button>
      ))}
    </div>
  );
};

export default PokemonTeam;