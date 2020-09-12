import axios from 'axios';

const { REACT_APP_ENV } = process.env;
const PORT = 8000;
const url = {
  dev: `http://localhost:${PORT}`,
};

export default axios.create({
  baseURL: url[REACT_APP_ENV || 'dev'],
});
