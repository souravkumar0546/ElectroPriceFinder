import axios from 'axios';

const apiurl = 'http://localhost:5000';

export const searchParts = async (partNumber, volume) => {
  try {
    const response = await axios.post(`${apiurl}/api/search`, { partNumber, volume });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const updateCartPrice = async (partNumber, volume, dataProvider) => {
  try {
    const response = await axios.post(`${apiurl}/api/updateprice`, { partNumber, volume, dataProvider });
    return response.data;
  } catch (error) {
    console.error('Error updating cart price:', error);
    throw error;
  }
};
