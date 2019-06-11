import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import store from './store';
import './App.css';
import HomeContainer from "./containers/HomeContainer";

const httpLink = new HttpLink({
  uri: 'http://localhost:3001/graphql',
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:3001/graphql`,
  options: {
    reconnect: true
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const cache = new InMemoryCache();
const client = new ApolloClient({ link, cache });

function App(){
  return(
    <Provider store={store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomeContainer} />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  )
}

export default App;
