import axios from 'axios';
import { movieApiKey } from '../../config';

export const getData = (url,page) => (
  axios.get(`https://api.themoviedb.org/3/${url}?api_key=${movieApiKey}&language=en&page=${page || 1}`)
)
