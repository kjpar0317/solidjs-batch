import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import toast from "solid-toast";

// const AXIOS_TIMEOUT: number = 30 * 60 * 1000; // 30분

const axiosUtils: AxiosInstance = axios.create({
  baseURL: "",
  // baseURL: `${process.env.REACT_APP_BASE_URI}`,
  // timeout: AXIOS_TIMEOUT,
  // signal: AbortSignal.timeout(AXIOS_TIMEOUT),
});

async function responseValidate(error: any): Promise<any> {
  // API 서버 접속 오류
  if (
    !error.response ||
    error.response.status === 404 ||
    error.response.status === 504
  ) {
    toast.error("API 서버 연결 오류");
    return !error.response ? 500 : error.response.status;
  }

  console.error(error.response);

  if (error.response.data.message) {
    toast.error(error.response.data.message);
  } else if (error.response.statusText) {
    toast.error(error.response.statusText);
  }

  return error.response.status;
}

axiosUtils.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
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
  (error: any): Promise<never> => {
    toast.error("axios 요청 에러");
    return Promise.reject(error);
  }
);

axiosUtils.interceptors.response.use(
  (response: AxiosResponse<any, any>): AxiosResponse<any, any> => {
    return response;
  },
  async (error: AxiosResponse<any, any> & AxiosError<any>): Promise<any> => {
    if (error.response && error.response.status === 401) {
      const loginId: string | null = sessionStorage.getItem("loginId");
      const token: string | null = sessionStorage.getItem("token");

      const res: AxiosResponse<any, any> = await axios.get(
        `/api/batch/retoken?loginId=${loginId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data && res.data.data && res.data.data.newToken) {
        sessionStorage.setItem("token", res.data.data.newToken);
        return Promise.resolve(axiosUtils(error && error.config));
      } else {
        toast.error("로그인이 만료되었습니다. 다시 로그인 해주세요.");
        sessionStorage.clear();
        setTimeout((): void => {
          window.location.replace("/");
        }, 2000);
      }
    }

    return Promise.reject(responseValidate(error));
  }
);

export default axiosUtils;
