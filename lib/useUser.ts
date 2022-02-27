import { useEffect, useState } from "react";
import Router from "next/router";
import useSWR from "swr";
import { User } from "../pages/api/user";

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR<User>("/api/user");

  // const urlSearchParams = new URLSearchParams(window.location.pathname);
  // const params = Object.fromEntries(urlSearchParams.entries());
  // console.log(params, window.location.pathname);
  // console.log(user?.isLoggedIn, window.location.pathname !== "/");

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    
    if (!redirectTo || !user) return;
    // if (!user?.isLoggedIn && window.location.pathname !== "/") Router.push("/");
    // console.log("useUser.useEffect");

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);
  console.log(user, "in use user");

  return { user, mutateUser };
}
