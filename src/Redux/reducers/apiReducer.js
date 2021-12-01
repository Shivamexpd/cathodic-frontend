import { handleActions } from "redux-actions";
import { ActionTypes } from "kepler.gl/actions";

export const appReducer = handleActions(
  {
    // listen on kepler.gl map update action to store a copy of viewport in app state
    [ActionTypes.ADD_LAYER]: (state, action) =>
      console.log(
        "action.payload",
        action.payload
      )({
        ...state,
        viewport: action.payload,
      }),
  },
  {}
);
