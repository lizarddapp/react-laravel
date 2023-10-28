import React, { useEffect } from "react";
import { useMe } from "../hooks/auth";
import { useNavigate } from "react-router-dom";

const NoView = () => {
  const { isAuthed } = useMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthed) {
      navigate("/login");
    }
  }, [isAuthed]);
  return <></>;
};

export default NoView;
