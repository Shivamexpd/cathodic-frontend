import React from "react";
import { MenuItem } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
const Logout = () => {
  const { logout, loginWithRedirect } = useAuth0();
  const logoutAuth = () => {
    logout(loginWithRedirect());
    window.localStorage.setItem("token", "false");
  };
  return <MenuItem onClick={()=>logout()}>Logout</MenuItem>;
};
export default Logout;
