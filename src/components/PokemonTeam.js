import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Search from '@/components/search';
import Link from 'next/link';

function Equipe() {
  // Initialiser les données de l'équipe avec un tableau vide pour l'équipe et un tableau vide pour les images de pokémon
  const [teamData, setTeamData] = useState({
    equipe: [],
    pokemonImages: []
  });
  // Obtenir l'objet router de Next.js
  const router = useRouter();

  // Utiliser l'effet pour charger les données de l'équipe depuis le stockage local lorsque le composant est monté
  useEffect(() => {
    const storedTeamData = localStorage.getItem('teamData');
    if (storedTeamData) {
      setTeamData(JSON.parse(storedTeamData));
    }
  }, []);

  // Utiliser l'effet pour sauvegarder les données de l'équipe dans le stockage local lorsque le composant est sur le point de se démonter
  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('teamData', JSON.stringify(teamData));
    });
  }, [teamData]);

  // Gérer l'ajout d'un pokémon à l'équipe
  const handleAddPokemon = async (pokemon) => {
    if (teamData.equipe.length < 6 && !teamData.equipe.includes(pokemon)) {
      const newTeamData = { ...teamData };
      newTeamData.equipe.push(pokemon);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      const data = await response.json();
      newTeamData.pokemonImages.push({ pokemon, image: data.sprites.other["official-artwork"].front_default });
      setTeamData(newTeamData);
    } else {
      alert("Votre équipe est déjà pleine ou le Pokémon est déjà dans l'équipe !");
    }
  };

  // Gérer la suppression d'un pokémon de l'équipe
  const handleRemovePokemon = (pokemon) => {
    const newTeamData = { ...teamData };
    newTeamData.equipe = newTeamData.equipe.filter((p) => p !== pokemon);
    newTeamData.pokemonImages = newTeamData.pokemonImages.filter((p) => p.pokemon !== pokemon);
    setTeamData(newTeamData);
  };

  return (
    // En-tête, barre de recherche et bouton retour 
    <div>
      <h1 className='text-center mb-4'>Attrapez-les tous</h1>
      <div className="searchBar">
        <Search/>
      </div>
      <p>
          <Link href="/" className="link-dark  m-auto">
            ← Retour
          </Link>
      </p>

      <h2>
        <ul style={{ display: 'flex', flexWrap: 'wrap', listStyle:'none' }}>
          Votre équipe :
          {teamData.equipe.map((pokemon, index) => (
            <li key={index} style={{ marginRight: 20 }}>
              {pokemon}
              {teamData.pokemonImages.find((image) => image.pokemon === pokemon) && (
                <div className="m-2">
                  <Image
                    src={teamData.pokemonImages.find((image) => image.pokemon === pokemon).image}
                    alt={"Pokémon : " + pokemon}
                    width={100}
                    height={100}
                  />
                </div>
              )}
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
          {teamData.equipe.length >= 6 && (
            <p className="text-wrap text-danger">Votre équipe est pleine !</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Equipe;