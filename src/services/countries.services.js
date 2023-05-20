/* eslint-disable prettier/prettier */
import network from "./network.services";

const getCountries = async () => await network.get("/all");

const getCountry = async (code) => await network.get(`/alpha/${code}`);

const getCountryByName = async (name) => await network.get(`/name/${name}`);

export default {
  getCountries,
  getCountry,
  getCountryByName,
};
