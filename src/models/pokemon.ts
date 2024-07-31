
  // Définition de l'interface pour stocker une page de Pokémons 
  export interface PokemonPage {
    // Tableau de résultats, où chaque élément est un objet contenant le nom d'un Pokémon
    results: { name: string }[];
    // URL de la page suivante, ou null si c'est la dernière page
    next: string | null;
    // URL de la page précédente, ou null si c'est la première page
    previous: string | null;
  }
  
  // Définition de l'interface pour stocker les caractéristiques d'un Pokémon (doublon)
  export interface Pokemon {
    // Nom du Pokémon
    name: string;
    // Tableau de statistiques du Pokémon
    stats: {
      // Objet contenant le nom de la statistique et sa valeur de base
      stat: {
        // Nom de la statistique
        name: string;
        // Valeur de base de la statistique
        base_stat: number;
      }
    }[];
    // Tableau de types du Pokémon
    types: {
      // Objet contenant le nom du type
      type: {
        // Nom du type
        name: string;
      }
    }[];
    // Tableau de mouvements du Pokémon
    moves: {
      // Objet contenant le nom du mouvement
      move: {
        // Nom du mouvement
        name: string;
      }
    }[];
    // Poids du Pokémon
    weight: number;
    // Taille du Pokémon
    height: number;
    // Objet contenant les sprites du Pokémon
    sprites: {
      // Objet contenant l'image officielle
      other: {
        // Objet contenant l'image officielle
        "official-artwork": {
          // URL de l'image officielle
          front_default: string;
        }
      }
    };
  }