import axios from "axios";

// Création d'une instance axios personnalisée
const axiosInstance = axios.create({
    // Base URL pour les requêtes HTTP
    baseURL: "https://pokeapi.co/api/v2/",
    // Délai d'attente maximal (en ms)
    timeout: 5000,
  });
  
  // Exportation de l'instance axios par défaut
  export default axiosInstance;