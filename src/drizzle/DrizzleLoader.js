import React from "react";
import { Drizzle } from "@drizzle/store";
import { drizzleReactHooks } from "@drizzle/react-plugin";

import drizzleOptions from "./drizzleOptions";
import App from "../App";

import { store } from "../store";

const drizzle = new Drizzle(drizzleOptions, store);
const { DrizzleProvider } = drizzleReactHooks;

const DrizzleLoader = () => {
  const hasWeb3Provider = () => {
    const hasWeb3Provider = typeof window.ethereum !== "undefined";
    return hasWeb3Provider;
  };

  return hasWeb3Provider ? (
    <DrizzleProvider drizzle={drizzle}>
      <App drizzle={drizzle} store={store} />
    </DrizzleProvider>
  ) : (
    <App drizzle={null} store={store} />
  );
};

export default DrizzleLoader;
