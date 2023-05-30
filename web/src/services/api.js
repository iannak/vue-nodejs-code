import axios from "axios";
import baseUrl from "./base_urls";

const headerTypes = {
  public: {
    "Content-Type": "application/json"
  },
  private: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + sessionStorage.getItem("token"),
  }
};

const getHeaderType = () => {
  const token = sessionStorage.getItem("token");
  const type = token ? "private" : "public";
  return headerTypes[type];
};

const apiClient = axios.create({
  baseURL: baseUrl,
  headers: getHeaderType()
});

export default apiClient;
