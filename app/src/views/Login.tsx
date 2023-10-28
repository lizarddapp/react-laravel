import { useForm } from "react-hook-form";
import React from "react";
import { Button, TextField } from "@radix-ui/themes";
import { useLogin } from "../hooks/auth";
import { processAxiosErrorSetError } from "../utils";
import { ErrorMessage } from "@hookform/error-message";
import { AxiosError } from "axios";

const Login = () => {
  const { register, handleSubmit, setError, formState } = useForm();

  const { mutate, error } = useLogin();
  const onSubmit = (data) => {
    mutate(data);
    if (error as AxiosError) {
      processAxiosErrorSetError(error, setError, "email");
      processAxiosErrorSetError(error, setError, "password");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col mb-2">
        <label> Email:</label>
        <TextField.Input {...register("email")} />
        <ErrorMessage errors={formState.errors} name="email" />
      </div>

      <div className="flex flex-col mb-2">
        <label> Password:</label>
        <TextField.Input {...register("password")} type="password" />
        <ErrorMessage errors={formState.errors} name="password" />
      </div>

      <Button className="block w-full">Login</Button>
    </form>
  );
};

export default Login;
