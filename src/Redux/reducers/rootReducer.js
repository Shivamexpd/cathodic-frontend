import { keplerGlReducer } from "kepler.gl/reducers";
import { combineReducers } from "redux";
import userReducer from "./userReducers";
const customizedKeplerGlReducer = keplerGlReducer.initialState({
  uiState: {
    readOnly: false,
    currentModal: false,
    mapControls: {
      visibleLayers: {
        show: true,
      },
      mapLegend: {
        show: true,
        active: false,
      },
      toggle3d: {
        show: true,
      },
      splitMap: {
        show: true,
      },
      mapLocale: {
        show: true,
      },
      mapDraw: {
        show: true,
      },
    },
  },
});



const RootReducer = combineReducers({
  // kepler.gl reducer

  keplerGl: keplerGlReducer,
  keplerGl: customizedKeplerGlReducer,
  userReducer: userReducer,
  // And any other existing reducers
  // app: keplerGlReducer
});

export default RootReducer;
