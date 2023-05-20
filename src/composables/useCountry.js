/* eslint-disable prettier/prettier */
import countriesServices from "@/services/countries.services";

const useCountry = () => {
  const getCountries = async () => {
    const response = await countriesServices.getCountries();
    return response;
  };

  const getCountry = async (code) => {
    const response = await countriesServices.getCountry(code);
    return response;
  };

  const getCountryByName = async (name) => {
    const response = await countriesServices.getCountryByName(name);
    return response;
  };

  return {
    getCountries,
    getCountry,
    getCountryByName,
  };
};

export default useCountry;
