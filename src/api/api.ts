import axios from "axios";

const BASE_URL = "http://localhost:3000/data";

export const fetchAllData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    return [];
  }
};

export const fetchData = async (page: number = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}?_page=${page}`);
    return response.data;
  } catch (error) {
    return [];
  }
};

export const fetchMedicineById = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};
