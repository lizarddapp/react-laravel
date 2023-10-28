import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "../types/shared.";
import { request } from "../utils";
import { useNavigate } from "react-router-dom";
import { useToastStore, useTokenStorage } from "../store/toast";
import { useCallback, useEffect } from "react";
import { AxiosResponse } from "axios";

export const useLogin = () => {
  const settoken = useTokenStorage((state) => state.setToken);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setToast } = useToastStore();
  return useMutation({
    mutationFn: postLogin,
    onSuccess: (res) => {
      const token = res.data.token;
      settoken(token);
      request.defaults.headers = {
        Authorization: `Bearer ${token}`,
      };
      navigate("/");
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (error) => {
      if (error?.response?.status === 401) {
        setToast({ msg: "Invalid credentials", type: "fail" });
      }
    },
  });
};

const postLogin = async (data) => {
  return await request.post("/api/login", data);
};

export const useMe = () => {
  const token = useTokenStorage((state) => state.token);
  const { data, isSuccess, isLoading, refetch } = useQuery({
    queryFn: getMe,
    queryKey: ["me", token],
    retry: false,
    enabled: !!token,
  });
  useEffect(() => {
    request.defaults.headers = token
      ? { Authorization: `Bearer ${token}` }
      : {};
  }, [token]);
  return { data, isAuthed: isSuccess, isLoading };
};

const getMe = async (data): Promise<AxiosResponse<User>> => {
  return await request.get("/api/me", data);
};

export const useLogout = () => {
  const navigate = useNavigate();
  const setToken = useTokenStorage((state) => state.setToken);
  const queryClient = useQueryClient();
  const logout = useCallback(() => {
    setToken(null);

    navigate("/login");

    queryClient.invalidateQueries({ queryKey: ["me"] });
  }, []);

  return { logout };
};
