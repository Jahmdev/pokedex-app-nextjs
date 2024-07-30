import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';


function Equipe() {
  const [equipe, setEquipe] = useState([]);
  const [pokemonData, setPokemonData] = useState({});
  const router = useRouter();

  useEffect(() => {
    const storedEquipe = window.localStorage.getItem('equipe');
    if (storedEquipe) {
      try {
        const parsedEquipe = JSON.parse(storedEquipe);
        setEquipe(parsedEquipe);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'équipe', error);
      }
    }
  }, []);

  useEffect(() => {
    try {
      const stringifiedEquipe = JSON.stringify(equipe);
      window.localStorage.setItem('equipe', stringifiedEquipe);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'équipe', error);
    }
  }, [equipe]);

  const handleAddPokemon = (pokemon) => {
    if (equipe.length < 6) {
      setEquipe([...equipe, pokemon]);
    } else {
      alert("Votre équipe est déjà pleine !");
    }
  };

  const handleRemovePokemon = (pokemon) => {
    setEquipe(equipe.filter((p) => p !== pokemon));
  };

  useEffect(() => {
    const fetchPokemonData = async () => {
      const promises = equipe.map((pokemon) => {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
          .then((response) => response.json())
          .then((data) => ({ [pokemon]: data }));
      });
      const results = await Promise.all(promises);
      const pokemonData = results.reduce((acc, current) => ({ ...acc, ...current }), {});
      setPokemonData(pokemonData);
    };
    fetchPokemonData();
  }, [equipe]);

  return (
    <div>
      <h2>
        <ul>
          Équipe :
          {equipe.map((pokemon, index) => (
            <li key={index}>
              {pokemon}
              <button type="button" className="btn btn-danger ml-2" onClick={() => handleRemovePokemon(pokemon)}>
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </h2>
      {router.query.pokemon && (
        <div>
          <button type="submit" className="btn btn-success mt-2" onClick={() => handleAddPokemon(router.query.pokemon)}>
            Ajouter à l'équipe
          </button>
          {equipe.length >= 6 && (
            <p className="text-wrap text-danger">Votre équipe est pleine !</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Equipe;