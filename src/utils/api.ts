const API_BASE_URL = "/api/v3/unites_legales";
const API_SIRET_URL = "/api/v3/etablissements";
export async function fetchCompanyBySiren(siren: string) {
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
      if (response.status === 404) {
        throw new Error("Aucune entreprise trouvée pour ce numéro SIREN.");
      } else if (response.status === 401) {
        throw new Error("Erreur 401 : Clé API invalide.");
      } else {
        throw new Error("Erreur serveur lors de la récupération des données.");
      }
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur API :", error);
    throw error;
  }
}
export async function fetchCompanyBySiret(siret: string) {
  try {
    const response = await fetch(`${API_SIRET_URL}/${siret}`, {
      method: "GET",
      headers: {
        "X-Client-Secret": import.meta.env.VITE_SIRENE_API_KEY, // Clé API via .env
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Aucune entreprise trouvée pour ce numéro SIREN.");
      } else if (response.status === 401) {
        throw new Error("Erreur 401 : Clé API invalide.");
      } else {
        throw new Error("Erreur serveur lors de la récupération des données.");
      }
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur API :", error);
    throw error;
  }
}
