import React from "react";
import { useAppSelector } from "./hooks/redux";
import Auth from "./pages/auth";

export const withAuth = (WrapperdComponent: any) => {
  return () => {
    const loggedInUser = useAppSelector((state) => state?.auth?.user);
    return loggedInUser ? <WrapperdComponent /> : <Auth />;
  };
};
