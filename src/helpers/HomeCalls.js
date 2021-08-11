import axios from "axios";

const baseUrl = "https://www.breakingbadapi.com/api/";

export const GetCharacterByAttributes = (attribute, name, pageSize, page) => {
  let searchString = name ? name.replace(/ /g, "+") : "";
  let offset = (page - 1) * pageSize;
  return axios.get(
    `${baseUrl}characters?limit=${pageSize}&offset=${offset}${
      attribute ? `&${attribute}=${searchString}` : ""
    }`
  );
};
