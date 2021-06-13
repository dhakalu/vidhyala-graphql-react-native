import React from "react";
import Pages from "./pages";
import store from "./store";
import { Provider } from "react-redux";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://192.168.100.4:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Pages />
      </ApolloProvider>
    </Provider>
  );
};

export default App;
