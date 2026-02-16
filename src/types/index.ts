export type Character = {
  id: string;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
};

// Backend /people response structure
export type PeopleResponse = {
  total: number;
  next: string | null;
  previous: string | null;
  characters: Character[];
};

// Backend /favorites response structure
export type FavoritesResponse = {
  data: Character[];
  page: number;
  pageSize: number;
  total: number;
};