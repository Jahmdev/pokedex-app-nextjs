import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Search from '@/components/search';

function Equipe() {
  const [teamData, setTeamData] = useState({
    equipe: [],
    pokemonImages: []
  });
  const router = useRouter();

  useEffect(() => {
    const storedTeamData = window.localStorage.getItem('teamData');
    if (storedTeamData) {
      setTeamData(JSON.parse(storedTeamData));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('teamData', JSON.stringify(teamData));
  }, [teamData]);

  const handleAddPokemon = async (pokemon) => {
    if (teamData.equipe.length < 6 && !teamData.equipe.includes(pokemon)) {
      const newTeamData = { ...teamData };
      newTeamData.equipe.push(pokemon);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      const data = await response.json();
      newTeamData.pokemonImages.push({ pokemon, image: data.sprites.other["official-artwork"].front_default });
      setTeamData(newTeamData);
    } else {
      alert("Votre équipe est déjà pleine ou le Pokemon est déjà dans l'équipe!");
    }
  };

  const handleRemovePokemon = (pokemon) => {
    const newTeamData = { ...teamData };
    newTeamData.equipe = newTeamData.equipe.filter((p) => p !== pokemon);
    newTeamData.pokemonImages = newTeamData.pokemonImages.filter((p) => p.pokemon !== pokemon);
    setTeamData(newTeamData);
  };

  return (
    <div>
      <div className="searchBar">
        <Search/>
      </div>
      <h2>
        <ul>
          Équipe :
          {teamData.equipe.map((pokemon, index) => (
            <li key={index}>
              {pokemon}
              <button type="button" className="btn btn-danger ml-2" onClick={() => handleRemovePokemon(pokemon)}>
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </h2>
      <div className="d-flex flex-direction-column flex-wrap justify-content-center border border-width-medium">
        {teamData.pokemonImages.map((pokemon, index) => (
          <div key={index} className="m-2">
            <Image
              src={pokemon.image}
              alt={"Pokemon: " + pokemon.pokemon}
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>
      {router.query.pokemon && (
        <div>
          <button type="submit" className="btn btn-success mt-2" onClick={() => handleAddPokemon(router.query.pokemon)}>
            Ajouter à l'équipe
          </button>
          {teamData.equipe.length >= 6 && (
            <p className="text-wrap text-danger">Votre équipe est pleine !</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Equipe;