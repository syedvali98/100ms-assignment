import axios from "axios";

const baseUrl = "https://www.breakingbadapi.com/api/";

export const GetCharactersByPage = (pageSize, page) => {
  let offset = (page - 1) * pageSize;
  return axios.get(`${baseUrl}characters?limit=${pageSize}&offset=${offset}`);
};

export const GetCharacterByAttributes = (attribute, name) => {
  let searchString = name.replace(/ /g, "+");
  return axios.get(`${baseUrl}characters?${attribute}=${searchString}`);
};
