import axios from 'axios';

const { REACT_APP_ENV } = process.env;
const PORT = 4008;
const url = {
  dev: `http://localhost:${PORT}`,
};

const instance = axios.create({
  baseURL: url[REACT_APP_ENV || 'dev'],
  headers: {
    common: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3MWExM2ZmOC00OTk0LTQxZTgtYjA5OC0wMGU1NzA0MDIyNTUiLCJ1c2VySWQiOiI3MWExM2ZmOC00OTk0LTQxZTgtYjA5OC0wMGU1NzA0MDIyNTUiLCJyb2xlIjoiU3VwZXJBZG1pbiIsImlhdCI6MTU5ODUyMjQ5NH0.TgfUqgpEglb66-DOQ5IjuWKN9j67PbPLv9ZWx_YJir8',
    },
  },
});

instance.interceptors.request.use();

export default instance;
