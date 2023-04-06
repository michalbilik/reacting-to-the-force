import axios from "axios";
import { IPeople } from "./api";

export interface IPeopleDetails {
  homeworldName: string;
  filmTitles: string[];
  starshipNames: string[];
  vehicleNames: string[];
}

export const fetchPeopleDetails = async (
  person: IPeople
): Promise<IPeopleDetails> => {
  const homeworldName = await fetchHomeworldName(person.homeworld);
  const filmTitles = await fetchFilmTitles(person.films);
  const starshipNames = await fetchStarshipNames(person.starships);
  const vehicleNames = await fetchVehicleNames(person.vehicles);

  return {
    homeworldName,
    filmTitles,
    starshipNames,
    vehicleNames,
  };
};

const fetchHomeworldName = async (homeworldUrl: string): Promise<string> => {
  try {
    const response = await axios.get(homeworldUrl);
    return response.data.name;
  } catch (error) {
    console.error(error);
    return "";
  }
};

const fetchFilmTitles = async (filmUrls: string[]): Promise<string[]> => {
  try {
    const filmRequests = filmUrls.map((filmUrl) => axios.get(filmUrl));
    const responses = await Promise.all(filmRequests);
    const titles = responses.map((response) => response.data.title);
    return titles;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const fetchStarshipNames = async (
  starshipUrls: string[]
): Promise<string[]> => {
  try {
    const starshipRequests = starshipUrls.map((starshipUrl) =>
      axios.get(starshipUrl)
    );
    const responses = await Promise.all(starshipRequests);
    const names = responses.map((response) => response.data.name);
    return names;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const fetchVehicleNames = async (vehicleUrls: string[]): Promise<string[]> => {
  try {
    const vehicleRequests = vehicleUrls.map((vehicleUrl) =>
      axios.get(vehicleUrl)
    );
    const responses = await Promise.all(vehicleRequests);
    const names = responses.map((response) => response.data.name);
    return names;
  } catch (error) {
    console.error(error);
    return [];
  }
};
