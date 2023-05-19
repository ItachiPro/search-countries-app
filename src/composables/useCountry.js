/* eslint-disable prettier/prettier */
import countriesServices from "@/services/countries.services";

const useCountry = () => {
  const getCountries = async () => {
    const response = await countriesServices.getCountries();
    return response;
  };

  return {
    getCountries,
  };
};

export default useCountry;
