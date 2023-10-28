import { Controller, useForm } from "react-hook-form";

import React, { useEffect } from "react";
import { UpdateUserProps } from "../types/shared.";
import { ErrorMessage } from "@hookform/error-message";
import { Button, Select, TextField } from "@radix-ui/themes";
import { useUserRetrieve, useUserUpdate } from "../hooks/user";

import { useParams } from "react-router-dom";
const UserDetails = () => {
  const params = useParams();

  const { register, handleSubmit, control, formState, setError, reset } =
    useForm<UpdateUserProps>();
  const { data: userData } = useUserRetrieve(params.id);
  const { mutateAsync } = useUserUpdate(setError);
  const onSubmit = async (data: UpdateUserProps) => {
    await mutateAsync(data);
    reset();
  };
  useEffect(() => {
    reset(userData);
  }, [userData]);

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

      <Controller
        control={control}
        name="status"
        render={({ field }) => (
          <div className="flex flex-col mb-2">
            <label> Status:</label>
            <Select.Root
              defaultValue="inactive"
              value={field.value}
              onValueChange={field.onChange}
            >
              <Select.Trigger className="w-full" />
              <Select.Content>
                <Select.Item value="active">Active</Select.Item>
                <Select.Item value="inactive">Inactive</Select.Item>
              </Select.Content>
            </Select.Root>
          </div>
        )}
      ></Controller>

      <Button className="block w-full">Update</Button>
    </form>
  );
};

export default UserDetails;
