import React, { useState } from 'react';
import { useRouter } from 'next/router';


function Search() {
  // Initialiser l'état de la requête de recherche avec une chaîne vide
  const [query, setQuery] = useState('');
  // Obtenir l'objet router de Next.js
  const router = useRouter();

  // Gérer les changements dans le champ de saisie de recherche
  const handleInputChange = (e) => {
    // Mettre à jour l'état de la requête de recherche avec la nouvelle valeur de saisie
    setQuery(e.target.value);
  };

  // Gérer la soumission du formulaire de recherche
  const handleSearch = (e) => {
    // Empêcher le comportement par défaut de soumission du formulaire
    e.preventDefault();
    // Vérifier si la requête de recherche n'est pas vide
    if (query.trim()) {
      // Naviguer vers la page des résultats de recherche avec le paramètre de requête
      router.push(`/${query.trim().toLowerCase()}`);
    }
  };

  return (
    <>
      <div className="searchBar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            name="searchBar"
            id="searchBar"
            placeholder="Rechercher"
            value={query}
            onChange={handleInputChange}
            className="form-control"
            />
          <button type="submit"  className="btn btn-primary mt-2" > ➜</button>
        </form>
      </div>
    </>
  );
}

export default Search;