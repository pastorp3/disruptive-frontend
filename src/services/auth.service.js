import axios from "axios";

const API_URL = "http://localhost:3000/users/";

const config = {
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};


const register = ( first_name, last_name, email, password) => {
  console.log(first_name)
  return axios.post(API_URL + "create", {
    first_name,
    last_name,
    email,
    password,
  },
  config );
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    },
    config )
    .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};