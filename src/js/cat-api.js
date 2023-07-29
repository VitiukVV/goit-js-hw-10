import axios from 'axios';

const API_KEY =
  'live_COizFScAZS8CCY0a2VSq7uguIcf5csqz2qatGGJ00hwkeWUQxaXzSE8teg6HVWYg';
const BASE_URL = 'https://api.thecatapi.com/v1';

axios.defaults.headers.common['x-api-key'] = API_KEY;

export function fetchBreeds() {
  return axios.get(`${BASE_URL}/breeds`).then(response => {
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    return response.data;
  });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.data;
    });
}
