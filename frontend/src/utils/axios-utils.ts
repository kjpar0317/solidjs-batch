import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import toast from "solid-toast";

const axiosUtils: AxiosInstance = axios.create({
  baseURL: "",
  // baseURL: `${process.env.REACT_APP_BASE_URI}`,
  // timeout: 30000
});

async function responseValidate(error: any) {
  // API 서버 접속 오류
  if (!error.response || error.response.status === 404 || error.response.status === 504) {
    toast.error("API 서버 연결 오류");
    return !error.response ? 500 : error.response.status;
  }

  console.error(error.response);

  if (error.response.status === 401) {
    const token: string | null = sessionStorage.getItem("token");
    const res: AxiosResponse<any, any> = await axios.post("/api/batch/retoken", null, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data && res.data.newToken) {
      sessionStorage.setItem("token", res.data.newToken);
    } else {
      toast.error("로그인이 만료되었습니다. 다시 로그인 해주세요.");
      sessionStorage.clear();
    }

    setTimeout(() => {
      window.location.replace("/");
    }, 2000);
  }

  if (error.response.data.message) {
    toast.error(error.response.data.message);
  } else if (error.response.statusText) {
    toast.error(error.response.statusText);
  }

  return error.response.status;
}

axiosUtils.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token: string | null = sessionStorage.getItem("token");

    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
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
  (response: AxiosResponse<any, any>) => {
    return response;
  },
  (error: AxiosResponse<any, any>) => {
    return Promise.reject(responseValidate(error));
  }
);

export default axiosUtils;
