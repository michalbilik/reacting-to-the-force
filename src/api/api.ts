import axios from "axios";

export interface IPeople {
  birth_year: string;
  films: string[];
  homeworld: string;
  name: string;
  starships: string[];
  vehicles: string[];
}

export const fetchPerson = async (
  searchedPerson: string
): Promise<IPeople[]> => {
  try {
    const response = await axios.get(
      `https://swapi.dev/api/people/?search=${searchedPerson}`
    );

    const person: IPeople[] = response.data.results.map((person: any) => ({
      birth_year: person.birth_year,
      films: person.films,
      homeworld: person.homeworld,
      name: person.name,
      starships: person.starships,
      vehicles: person.vehicles,
    }));

    return person;
  } catch (error) {
    console.error(error);
    return [];
  }
};
