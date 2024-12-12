import React, { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { SearchTypeSelector } from "./components/SearchTypeSelector";
import {CompanyCard} from "./components/CompanyCard";
import { FrenchFlag } from "./components/FrenchFlag";
import { fetchCompanyBySiren, fetchCompanyBySiret } from "./utils/api";
import { Building } from "lucide-react";
import type { SearchType } from "./types/search";

function App() {
  const [company, setCompany] = useState<any>(null); // État pour stocker les données de l'entreprise
  const [error, setError] = useState<string>(""); // État pour les erreurs
  const [isLoading, setIsLoading] = useState(false); // État pour le chargement
  const [searchType, setSearchType] = useState<SearchType>("siren"); // Type de recherche (SIREN ou SIRET)

  // Fonction pour gérer la recherche
  const handleSearch = async (value: string, type: SearchType) => {
    setIsLoading(true); // Afficher le spinner
    setError(""); // Réinitialiser les erreurs
    setCompany(null); // Réinitialiser les données

    try {
      let data;
      console.log(`Recherche de type : ${type}, valeur : ${value}`);

      if (type === "siren") {
        // Recherche avec SIREN
        data = await fetchCompanyBySiren(value);
        setCompany(data); // Stocker les données de l'unité légale
      } else if (type === "siret") {
        // Recherche avec SIRET
        data = await fetchCompanyBySiret(value);
        setCompany(data.etablissement); // Stocker les données de l'établissement
      }

      console.log("Données récupérées :", data);
    } catch (err) {
      console.error("Erreur lors de la recherche :", err);
      setError("Erreur : entreprise non trouvée ou données invalides.");
    } finally {
      setIsLoading(false); // Arrêter le spinner
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <Building className="text-blue-600" size={48} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Recherche d'Entreprise
          </h1>
          <div className="flex justify-center mb-4">
            <FrenchFlag />
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Recherchez une entreprise par son numéro SIREN (9 chiffres) ou SIRET
            (14 chiffres)
          </p>
        </div>

        <div className="flex flex-col items-center space-y-8">
          {/* Sélection du type de recherche */}
          <SearchTypeSelector
            selectedType={searchType}
            onTypeChange={setSearchType}
          />

          {/* Barre de recherche */}
          <SearchBar
            onSearch={handleSearch}
            isLoading={isLoading}
            searchType={searchType}
          />

          {/* Affichage des erreurs */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 w-full max-w-2xl">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Spinner de chargement */}
          {isLoading && (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}

          {/* Affichage des données de l'entreprise */}
          {company ? (
            <CompanyCard company={company} />
          ) : (
            !isLoading &&
            !error && (
              <div className="text-gray-600">Aucune donnée à afficher.</div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
