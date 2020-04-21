import React from "react";
import { Provider } from "react-redux";

import Pages from "./Pages";

const App = ({ drizzle, store }) => {
  return (
    <Provider store={store}>
      <Pages />
    </Provider>
  );
};

export default App;
