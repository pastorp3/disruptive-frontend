import axios from "axios";

const API_URL = "http://localhost:3000/";
const COINS_API = "http://rest.coinapi.io"

const config = {
  headers: {
    'X-CoinAPI-Key': 'B53C3D93-1673-4740-A67E-3FAAF2C00020'
  },
};

const getCoinData = (coin) => {
  return axios.get(COINS_API + `/v1/exchangerate/${coin}/USD`, config)
}

const getUserBoard = (id) => {
  return axios.get(API_URL + `users/${id}`,);
};

const getCalculation = (coin, coin_value, invest) => {
  return axios.post(API_URL + 'calculation', {
    coin,
    coin_value,
    invest,
  })
}


export default {
  getUserBoard,
  getCoinData,
  getCalculation
};