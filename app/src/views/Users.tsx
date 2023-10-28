import React, { useState } from "react";
import { useUserDelete, useUserRetrieve, useUsers } from "../hooks/user";
import DataTable from "../components/DataTable";
import { Button, TextField } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserFilterProps } from "../types/shared.";
import Conrifrm from "../components/ConfirmButton";
import ConfirmButton from "../components/ConfirmButton";

const Users = () => {
  const [filter, setFilter] = useState<UserFilterProps>({
    email: "",
    name: "",
    phone: "",
  });

  const { data } = useUsers(filter);
  const { mutate } = useUserDelete(filter);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<UserFilterProps>({
    defaultValues: filter,
  });
  const onSubmit = (data: UserFilterProps) => {
    setFilter(data);
  };
  return (
    <>
      <form
        className="flex lg:flex-row flex-col w-full gap-4 lg:items-end items-stretch"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label>Email</label>
          <TextField.Input {...register("email")} />
        </div>
        <div className="flex flex-col">
          <label>Phone</label>
          <TextField.Input {...register("phone")} />
        </div>
        <div className="flex flex-col">
          <label>Name</label>
          <TextField.Input {...register("name")} />
        </div>
        <Button
          variant="outline"
          type="button"
          onClick={() => {
            reset();
            setFilter({});
          }}
        >
          Reset
        </Button>
        <Button>Search</Button>
      </form>

      <DataTable
        columns={[
          { accessorKey: "email", header: "Email" },
          { accessorKey: "phone", header: "Phone" },
          { accessorKey: "first_name", header: "First Name" },
          { accessorKey: "last_name", header: "Last Name" },
          { accessorKey: "status", header: "Status" },
          {
            accessorKey: "action",
            header: "",
            cell: ({ row }) => (
              <div className="flex gap-4">
                {" "}
                <Button onClick={() => navigate(`/users/${row.original.id}`)}>
                  Edit
                </Button>
                <ConfirmButton
                  message="Are you sure want to delete?"
                  onConfirm={() => {
                    mutate(row.original.id);
                  }}
                >
                  Delete
                </ConfirmButton>
              </div>
            ),
          },
        ]}
        data={data}
      ></DataTable>
    </>
  );
};

export default Users;
