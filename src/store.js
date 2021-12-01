import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { taskMiddleware } from "react-palm/tasks";
import RootReducer from "./Redux/reducers/rootReducer";

const middleware = [taskMiddleware];

const store = createStore(
  RootReducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
