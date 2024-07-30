import { useState, createContext, ReactNode } from 'react';
import * as React from 'react'

interface Pokemon {
  id: number;
  // Ajoutez les autres propriétés de l'objet Pokémon si nécessaire
}

interface PokemonContextValue {
  team: Pokemon[];
  addPokemon: (pokemon: Pokemon) => void;
  removePokemon: (pokemon: Pokemon) => void;
}

const PokemonContext = createContext<PokemonContextValue | null>(null);

const PokemonProvider: React.FC<{ children: ReactNode }> = ({ children }): ReactNode => {
  const [team, setTeam] = useState<Pokemon[]>([]);

  const addPokemon = (pokemon: Pokemon) => {
    if (team.length < 6) {
      setTeam((prevTeam) => [...prevTeam, pokemon]);
    }
  };

  const removePokemon = (pokemon: Pokemon) => {
    setTeam((prevTeam) => prevTeam.filter((p) => p.id !== pokemon.id));
  };

  return (
    <PokemonContext.Provider> value={{ team, addPokemon, removePokemon }}>
    </PokemonContext.Provider>
  );
};

export { PokemonProvider, PokemonContext };