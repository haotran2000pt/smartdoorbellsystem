import axios from "axios";
import { getAccessToken, setAccessToken } from "src/utils/token.utils";
import urlJoin from "url-join";

const API_URL = "http://localhost:4000/";

const ApiClient = () => {
  const instance = axios.create({
    baseURL: urlJoin(API_URL, "/api/v1/"),
    withCredentials: true,
  });

  instance.interceptors.request.use(async (request) => {
    const token = getAccessToken();

    request.headers = {
      Authorization: `Bearer ${token}`,
    };

    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        try {
          originalRequest._retry = true;
          const { access } = (
            await axios.get("refresh-token", { withCredentials: true })
          ).data;

          setAccessToken(access);

          return instance(originalRequest);
        } catch (e: any) {
          console.log(e);
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default ApiClient();
