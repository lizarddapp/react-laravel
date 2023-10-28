import React from "react";
import { useMe } from "../hooks/auth";

const UserStatus = () => {
  const { data } = useMe();
  const user = data?.data;

  return (
    <div className="flex flex-col">
      <div>Email: {user?.email}</div>
      <div>Phone: {user?.phone}</div>
      <div>First Name: {user?.first_name}</div>
      <div>Last Name: {user?.last_name}</div>
      <div>Status: {user?.status}</div>
    </div>
  );
};

export default UserStatus;
