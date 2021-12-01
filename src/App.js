import "./App.css";
import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0, Auth0Provider } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import Screen from "./components/MainScreen";
import { getUserToken } from "./Redux/actions/userActions";

function App() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();


  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then((token) => {
        dispatch(getUserToken(token));
      });
    }
  }, [isAuthenticated]);

  return (
    <Switch>
      <Route path="/" component={Screen} />
      <Route path="/test" component={<div>test</div>} />
    </Switch>
  );
}
export default App;
