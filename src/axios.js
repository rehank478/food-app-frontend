import axios from 'axios';

export default axios.create({
  baseURL: `https://food-app-backend-mern.herokuapp.com/`
});