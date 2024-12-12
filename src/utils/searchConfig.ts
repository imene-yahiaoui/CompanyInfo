import { SearchConfig } from '../types/search';

export const searchConfigs: Record<string, SearchConfig> = {
  siren: {
    type: 'siren',
    placeholder: 'Entrez un numéro SIREN (9 chiffres)',
    pattern: /^\d{9}$/,
    errorMessage: 'Le numéro SIREN doit contenir exactement 9 chiffres',
    maxLength: 9
  },
  siret: {
    type: 'siret',
    placeholder: 'Entrez un numéro SIRET (14 chiffres)',
    pattern: /^\d{14}$/,
    errorMessage: 'Le numéro SIRET doit contenir exactement 14 chiffres',
    maxLength: 14
  }
};