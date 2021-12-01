import React, { useEffect } from "react";
import { MenuItem } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect, loginWithPopup } = useAuth0();

  const status = localStorage.getItem("token") === "true";
  useEffect(() => {
    if (status) {
      console.log("logged in true");
    } else {
      console.log("logged in false");
      loginAuth().then((r) => console.log(r));
    }
  }, [status]);
  return <MenuItem onClick={()=>loginWithRedirect()}>Login</MenuItem>;
};
export default Login;
