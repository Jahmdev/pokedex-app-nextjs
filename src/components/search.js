import React, { useState } from 'react';
import { useRouter } from 'next/router';

function Search() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
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
          <button type="submit"  className="btn btn-primary mt-2" >Rechercher</button>
        </form>
      </div>
    </>
  );
}

export default Search;

