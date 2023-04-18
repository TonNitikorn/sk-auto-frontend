// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { React } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  isAuthenticatedSelector,
  isAuthenticatingSelector,
  getToken
} from "../store/slices/userSlice";
import { useAppDispatch } from "../store/store";

const withAuth = (WrappedComponent) => (props) => {
  // this hoc only supports client side rendering.

  const isClient = () => typeof window !== "undefined";

  if (isClient()) {
    const router = useRouter();
    const { route } = router;
    const dispatch = useAppDispatch();
    const isAuthenticated = useSelector(isAuthenticatedSelector);
    const isAuthenticating = useSelector(isAuthenticatingSelector);
    // is fetching session (eg. show spinner)
    if (isAuthenticating) {
      return null;

    }

    // If user is not logged in, return login component
    if (route !== "/auth/login") {
      if (!isAuthenticated) {
        if (route == "/") {
          const token = new URLSearchParams(window.location.search).get("access_token");
          const redirect = async () => {
            dispatch(getToken({ token: localStorage.getItem("access_token") }))
          };

          if (token) {
            localStorage.setItem("access_token", token);
            redirect();
          } else {
            router.push(`/auth/login`);
          }

        } else {
          router.push(`/auth/login`);
          return null;
        }
      } else if (route == "/") {
        if (isAuthenticated) {
          const token = new URLSearchParams(window.location.search).get("access_token");

          if (localStorage.getItem('access_token') !== token) {
            localStorage.setItem('access_token', token)
          } else {
            router.push(`/home`); // default page after login when call root path
            return null;
          }

        }
        router.push(`/home`); // default page after login when call root path
        return null;
      }
    } else {
      if (isAuthenticated) {
        router.push(`/home`); // default page after login
        return null;
      }
    }
    // If user is logged in, return original component
    return <WrappedComponent {...props} />;
  }
  return null;
};
export default withAuth;
