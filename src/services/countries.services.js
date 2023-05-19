/* eslint-disable prettier/prettier */
import network from "./network.services";

const getCountries = async () => await network.get("/all");

const getCountry = async (code) => await network.get(`/alpha/${code}`);
export default {
  getCountries,
  getCountry,
};
