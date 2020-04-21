import { createBrowserHistory } from "history";
import { routerMiddleware } from "react-router-redux";
import drizzleOptions from "../drizzle/drizzleOptions";
import { generateStore } from "@drizzle/store";

import globalReducer from "./reducers/global";

const history = createBrowserHistory();
const routingMiddleware = routerMiddleware(history);

const contractEventNotifier = (store) => (next) => (action) => {
  if (action.type === "SEND_CONTRACT_TX") {
    console.log("SEND_CONTRACT_TX", action.fnName, action.stackTempKey);
  }

  if (action.type === "TX_BROADCASTED") {
    console.log("TX_BROADCASTED", action.txHash);
  }

  if (action.type === "TX_SUCCESSFUL") {
    console.log("TX_SUCCESSFUL");
  }

  if (action.type === "TX_ERROR") {
    console.log("TX_ERROR");
  }

  return next(action);
};

const appReducers = { global: globalReducer };
const appMiddlewares = [contractEventNotifier, routingMiddleware];

const store = generateStore({
  drizzleOptions,
  appReducers,
  appMiddlewares,
  disableReduxDevTools: false,
});

export { history };
export { store };

export default store;
