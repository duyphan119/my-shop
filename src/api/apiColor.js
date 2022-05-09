import * as constants from "../constants";
import { configAxiosResponse } from "../config/configAxios";
const API_URL = `${constants.SERVER_URL}/v1/api/color`;
export const apiGetAllColors = async () => {
  try {
    const data = await configAxiosResponse().get(`${API_URL}`);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
