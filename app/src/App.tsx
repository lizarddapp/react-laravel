import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./views/Layout";
import Login from "./views/Login";
import React from "react";
import Register from "./views/Register";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Theme } from "@radix-ui/themes";
import Users from "./views/Users";
import UserDetails from "./views/UserDetails";
import { useMe } from "./hooks/auth";
import NoView from "./views/NoView";
import UserStatus from "./views/UserStatus";
import Loading from "./views/Loading";

function App() {
  // Create a client
  const queryClient = new QueryClient();

  return (
    <Theme>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </Theme>
  );
}

const Router = () => {
  const { isAuthed, isLoading } = useMe();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Routes>
      <Route element={<Layout />}>
        {isAuthed ? (
          <>
            <Route index path="/" element={<UserStatus />} />
          </>
        ) : (
          <>
            <Route path="login" element={<Login />} />
          </>
        )}
        <Route path="register" element={<Register />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<UserDetails />} />
        <Route path="*" element={<NoView />} />
      </Route>
    </Routes>
  );
};
export default App;
