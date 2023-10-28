import { useForm } from "react-hook-form";

import React from "react";
import { RegisterProps } from "../types/shared.";
import { ErrorMessage } from "@hookform/error-message";
import { Button, TextField } from "@radix-ui/themes";
import { useUserCreate } from "../hooks/user";
import { useToastStore } from "../store/toast";
const Register = () => {
  const { register, handleSubmit, getValues, formState, setError, reset } =
    useForm<RegisterProps>();

  const { mutateAsync } = useUserCreate(setError);
  const onSubmit = async (data: RegisterProps) => {
    await mutateAsync(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col mb-2">
        <label> Email:</label>
        <TextField.Input {...register("email", { required: true })} />
        <ErrorMessage name="email" errors={formState.errors} />
      </div>

      <div className="flex flex-col mb-2">
        <label> First Name:</label>
        <TextField.Input {...register("first_name", { required: true })} />
      </div>

      <div className="flex flex-col mb-2">
        <label> Last Name:</label>
        <TextField.Input {...register("last_name", { required: true })} />
      </div>

      <div className="flex flex-col mb-2">
        <label> Phone:</label>
        <TextField.Input {...register("phone", { required: true })} />
      </div>

      <div className="flex flex-col mb-2">
        <label> Password:</label>
        <TextField.Input
          type="password"
          {...register("password", { required: true })}
        />
        <ErrorMessage name="password" errors={formState.errors} />
      </div>

      <div className="flex flex-col mb-2">
        <label> Confirm Password:</label>
        <TextField.Input
          type="password"
          {...register("confirmPassword", {
            validate: (value) => value === getValues("password"),
          })}
        />
        <ErrorMessage name="confirmPassword" errors={formState.errors} />
      </div>

      <Button className="block w-full">Register</Button>
    </form>
  );
};

export default Register;
