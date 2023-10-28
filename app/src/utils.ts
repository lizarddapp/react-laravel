import axios, { AxiosError } from "axios";
import { UseFormSetError } from "react-hook-form";
import Cookies from "js-cookie";
import { useTokenStorage } from "./store/toast";
// Set config defaults when creating the instance
const token = useTokenStorage.getState().token;

export const request = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
});

export const processAxiosErrorSetError = (
  e: AxiosError,
  setError: UseFormSetError<any>,
  name: string
) => {
  if (e.response?.status == 422) {
    if (e.response?.data?.errors[name]) {
      setError(name, { message: e.response?.data?.errors[name][0] });
    }
  }
};
