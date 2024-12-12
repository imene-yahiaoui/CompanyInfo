export type SearchType = "siren" | "siret";

export interface SearchConfig {
  type: SearchType;
  placeholder: string;
  pattern: RegExp;
  errorMessage: string;
  maxLength: number;
}
