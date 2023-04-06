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
  const [filmTitles, starshipNames, vehicleNames] = await Promise.all([
    fetchFilmTitles(person.films),
    fetchStarshipNames(person.starships),
    fetchVehicleNames(person.vehicles),
  ]);

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
    const requests = filmUrls.map((filmUrl) => axios.get(filmUrl));
    const responses = await axios.all(requests);
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
    const requests = starshipUrls.map((starshipUrl) => axios.get(starshipUrl));
    const responses = await axios.all(requests);
    const names = responses.map((response) => response.data.name);
    return names;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const fetchVehicleNames = async (vehicleUrls: string[]): Promise<string[]> => {
  try {
    const requests = vehicleUrls.map((vehicleUrl) => axios.get(vehicleUrl));
    const responses = await axios.all(requests);
    const names = responses.map((response) => response.data.name);
    return names;
  } catch (error) {
    console.error(error);
    return [];
  }
};
