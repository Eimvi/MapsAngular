export interface PlacesResponse {
  type: string;
  query: number[];
  features: Feature[];
  attribution: string;
}

export interface Feature {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: Properties;
  text: string;
  place_name: string;
  center: number[];
  geometry: Geometry;
  context: Context[];
}

interface Context {
  id: string;
  text: string;
  short_code?: string;
  wikidata?: string;
}

interface Geometry {
  type: string;
  coordinates: number[];
}

interface Properties {
  accuracy: string;
}


