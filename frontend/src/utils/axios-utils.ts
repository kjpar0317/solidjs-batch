import axios from "axios";
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import toast from "solid-toast";

const axiosUtils = axios.create({
  baseURL: "",
  // baseURL: `${process.env.REACT_APP_BASE_URI}`,
  // timeout: 30000
});

const refreshAuthLogic = (failedRequest: any) =>
    axios.post('/api/batch/retoken').then((res) => {
        sessionStorage.setItem('token', res.data.token);
        failedRequest.response.config.headers['Authorization'] = 'Bearer ' + res.data.token;
        return Promise.resolve();
    });

// Instantiate the interceptor
createAuthRefreshInterceptor(axiosUtils, refreshAuthLogic);

async function responseValidate(error: any) {
//   console.error(error.response);

  // API 서버 접속 오류
  if (error.response.status === 404 || error.response.status === 504) {
    toast.error("API 서버 연결 오류");
    return "api server connection error";
  }

  if (error.response.data.message) {
    toast.error(error.response.data.message);

    // if (error.response.status === 401) {
    //   sessionStorage.removeItem("id");
    //   sessionStorage.removeItem("token");

    //   setTimeout(() => {
    //     window.location.replace("/");
    //   }, 2000);
    // }
    return error.response.data.message;
  }

   return error.response.status;
}

axiosUtils.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");

    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
      // config.headers["x-access-token"] = token;
    }

    if (config.headers) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    toast.error("axios 요청 에러");
    return Promise.reject(error);
  }
);

axiosUtils.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(responseValidate(error));
  }
);

export default axiosUtils;