import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  RegisterProps,
  UpdateUserProps,
  UserFilterProps,
} from "../types/shared.";
import { processAxiosErrorSetError, request } from "../utils";
import { useToastStore } from "../store/toast";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

export const useUsers = (filters?: UserFilterProps) => {
  return useQuery({
    queryFn: () => getUser(filters),
    queryKey: ["users", filters],
  });
};

const getUser = async (filters) => {
  return (await request.get("/api/users", { params: filters })).data;
};

export const useUserRetrieve = (id: string) => {
  return useQuery({
    queryFn: () => getUserRetrive(id),
    queryKey: ["users", id],
  });
};

const getUserRetrive = async (id) => {
  return (await request.get(`/api/users/${id}`)).data;
};

export const useUserDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

const deleteUser = async (id) => {
  return (await request.delete(`/api/users/${id}`)).data;
};

export const useUserCreate = (setError) => {
  const setToast = useToastStore((state) => state.setToast);
  return useMutation({
    mutationFn: postUserCreate,
    onSuccess: () =>
      setToast({ msg: "Create User Successfully", type: "success" }),
    onError: (e: AxiosError) => {
      // processAxiosError(e).email?.[0] &&
      //   setError("email", {
      //     message: processAxiosError(e).email[0],
      //   });
      // setError("password", {
      //   message: processAxiosError(e).password[0],
      // });
      processAxiosErrorSetError(e, setError, "email");
      processAxiosErrorSetError(e, setError, "password");
    },
  });
};

const postUserCreate = async (payload: RegisterProps) => {
  return (await request.post(`/api/users`, payload)).data;
};

export const useUserUpdate = () => {
  const setToast = useToastStore((state) => state.setToast);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: putUserCreate,
    onSuccess: () => {
      setToast({ msg: "Update User Successfully", type: "success" });
      navigate("/users");
    },
  });
};

const putUserCreate = async (payload: UpdateUserProps) => {
  return (await request.put(`/api/users/${payload.id}`, payload)).data;
};
