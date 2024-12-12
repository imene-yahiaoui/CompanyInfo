const API_BASE_URL = "/api/v3/unites_legales";
const API_SIRET_URL = "/api/v3/etablissements";

// Fonction pour récupérer les données d'une entreprise par SIREN
export async function fetchCompanyBySiren(siren) {
  try {
    // Vérification du format du numéro SIREN
    if (!/^\d{9}$/.test(siren)) {
      throw new Error("Le numéro SIREN doit être une suite de 9 chiffres.");
    }

    // Appel API via le proxy
    const response = await fetch(`${API_BASE_URL}/${siren}`, {
      method: "GET",
      headers: {
        "X-Client-Secret": import.meta.env.VITE_SIRENE_API_KEY, // Clé API via .env
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      // Gestion des erreurs en fonction du code HTTP
      if (response.status === 404) {
        throw new Error("Aucune entreprise trouvée pour ce numéro SIREN.");
      } else if (response.status === 401) {
        throw new Error("Erreur 401 : Clé API invalide.");
      } else {
        throw new Error("Erreur serveur lors de la récupération des données.");
      }
    }

    // Retour des données au format JSON
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de l'appel API SIREN :", error.message);
    throw error; // Propagation de l'erreur pour gestion ultérieure
  }
}

// Fonction pour récupérer les données d'une entreprise par SIRET
export async function fetchCompanyBySiret(siret) {
  try {
    // Vérification du format du numéro SIRET
    if (!/^\d{14}$/.test(siret)) {
      throw new Error("Le numéro SIRET doit être une suite de 14 chiffres.");
    }

    // Appel API via le proxy
    const response = await fetch(`${API_SIRET_URL}/${siret}`, {
      method: "GET",
      headers: {
        "X-Client-Secret": import.meta.env.VITE_SIRENE_API_KEY, // Clé API via .env
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      // Gestion des erreurs en fonction du code HTTP
      if (response.status === 404) {
        throw new Error("Aucune entreprise trouvée pour ce numéro SIRET.");
      } else if (response.status === 401) {
        throw new Error("Erreur 401 : Clé API invalide.");
      } else {
        throw new Error("Erreur serveur lors de la récupération des données.");
      }
    }

    // Transformation des données JSON
    const result = await response.json();

    // Vérification de la présence du numéro SIREN dans la réponse
    const siren = result?.etablissement?.siren;
    if (!siren) {
      throw new Error("Aucun numéro SIREN associé au numéro SIRET fourni.");
    }

    // Appel de la fonction fetchCompanyBySiren pour récupérer les détails complets
    return await fetchCompanyBySiren(siren);
  } catch (error) {
    console.error("Erreur lors de l'appel API SIRET :", error.message);
    throw error; // Propagation de l'erreur pour gestion ultérieure
  }
}
