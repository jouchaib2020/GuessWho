import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  withCredentials: true
});


export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    console.log(`api: login response : ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const logout = async () => {
    try {
      const response = await api.get('/logout');
      return response.data;
    } catch (error) {
      throw error;
    }
  };


export const startGame = async (difficulty, domain) => {
    try {
      const response = await api.get(`/game/${difficulty}/${domain}`);
      console.log(JSON.stringify(response.data['secretItem']));
      return response.data;
    } catch (error) {
      throw error;
    }
};
export const addMatch = async (userId, difficulty, score, secretItemId, isWon) => {
    try {
      const response = await api.post(`/${userId}/addMatch`, { secretItemId, difficulty, score, isWon });
      console.log(`api: addMatch response : ${JSON.stringify(response.data)}`);
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const getItem = async (itemId) => {
    try {
      const response = await api.get(`/item/${itemId}`);
      console.log(`api :${JSON.stringify(response.data)}`);
      return response.data['item'];
    } catch (error) {
      throw error;
    } 
};

export const getHistory = async (userId) => {
    try {
      const response = await api.get(`/${userId}/history`);
      console.log(`api :${JSON.stringify(response.data)}`);
      return response.data['history'];
    } catch (error) {
      throw error;
    }
}