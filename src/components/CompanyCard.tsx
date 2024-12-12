import React from "react";
import { Building2, MapPin, Users, Briefcase } from "lucide-react";

interface CompanyCardProps {
  company: {
    unite_legale: {
      siren: string;
      denomination: string | null;
      categorie_juridique: string | null;
      activite_principale: string | null;
      tranche_effectifs: string | null;
      annee_effectifs: number | null;
      date_creation: string | null;
      etat_administratif: string | null;
      categorie_entreprise: string | null;
      etablissements: Array<{
        siret: string;
        date_creation: string | null;
        numero_voie: string | null;
        type_voie: string | null;
        libelle_voie: string | null;
        code_postal: string | null;
        libelle_commune: string | null;
        etat_administratif: string | null;
        etablissement_siege: boolean;
      }>;
      etablissement_siege: {
        siret: string;
        numero_voie: string | null;
        type_voie: string | null;
        libelle_voie: string | null;
        code_postal: string | null;
        libelle_commune: string | null;
      } | null;
    };
  };
}

export function CompanyCard({ company }: CompanyCardProps) {
  if (!company || !company.unite_legale) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded">
        Aucune donnée d'entreprise disponible.
      </div>
    );
  }

  const {
    unite_legale: {
      siren,
      denomination = "Nom indisponible",
      categorie_juridique = "Non spécifiée",
      activite_principale = "Non spécifiée",
      tranche_effectifs,
      annee_effectifs,
      date_creation,
      etat_administratif,
      categorie_entreprise = "Indisponible",
      etablissement_siege,
      etablissements,
    },
  } = company;

  // Fonctions utilitaires pour le formatage
  const formatDate = (date: string | null) =>
    date ? new Date(date).toLocaleDateString("fr-FR") : "Date indisponible";

  const translateEtatAdministratif = (etat: string | null) => {
    if (etat === "A") return "Actif";
    if (etat === "F") return "Fermé";
    return "Indisponible";
  };

  const translateTrancheEffectifs = (tranche: string | null) => {
    const mapping = {
      "00": "0 salarié",
      "01": "1 à 2 salariés",
      "02": "3 à 5 salariés",
      "03": "6 à 9 salariés",
    };
    return tranche
      ? mapping[tranche] || "Tranche inconnue"
      : "Tranche indisponible";
  };

  const formatAddress = (etablissement: typeof etablissement_siege) => {
    if (!etablissement) return "Adresse indisponible";
    const {
      numero_voie,
      type_voie,
      libelle_voie,
      code_postal,
      libelle_commune,
    } = etablissement;
    return `${numero_voie || ""} ${type_voie || ""} ${libelle_voie || ""}, ${
      code_postal || ""
    } ${libelle_commune || ""}`.trim();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full space-y-6">
      {/* Informations générales */}
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Building2 className="text-blue-600 mt-1" size={24} />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{denomination}</h2>
            <p className="text-gray-600">
              Catégorie juridique : {categorie_juridique}
            </p>
          </div>
        </div>

        <p className="text-gray-700">
          <span className="font-semibold">SIREN :</span> {siren}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Date de création :</span>{" "}
          {formatDate(date_creation)}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">État administratif :</span>{" "}
          {translateEtatAdministratif(etat_administratif)}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Catégorie de l'entreprise :</span>{" "}
          {categorie_entreprise}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Activité principale :</span>{" "}
          {activite_principale}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Effectifs :</span>{" "}
          {translateTrancheEffectifs(tranche_effectifs)}{" "}
          {annee_effectifs && `(année ${annee_effectifs})`}
        </p>
      </div>

      {/* Adresse du siège */}
      {etablissement_siege && (
        <div className="space-y-4">
         <div className="flex items-start gap-3">
          <MapPin className="text-blue-600 mt-1" size={24} />
          <h3 className="text-lg font-semibold text-gray-900">
            Adresse du siège :
          </h3>
          </div>
         
          <p className="text-gray-700">{formatAddress(etablissement_siege)}</p>
        </div>
      )}

      {/* Autres établissements */}
      {etablissements.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Anciens établissements :
          </h3>
          <ul className="space-y-4">
            {etablissements
              .filter((etablissement) => !etablissement.etablissement_siege) // Exclure le siège
              .map((etablissement, index) => (
                <li key={index} className="text-gray-700">
                  <p>
                    <span className="font-semibold">SIRET :</span>{" "}
                    {etablissement.siret}
                  </p>
                  <p>
                    <span className="font-semibold">Adresse :</span>{" "}
                    {formatAddress(etablissement)}
                  </p>
                  <p>
                    <span className="font-semibold">Date de création :</span>{" "}
                    {formatDate(etablissement.date_creation)}
                  </p>
                  <p>
                    <span className="font-semibold">État administratif :</span>{" "}
                    {translateEtatAdministratif(
                      etablissement.etat_administratif
                    )}
                  </p>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
