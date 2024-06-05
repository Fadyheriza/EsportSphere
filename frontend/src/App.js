import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

const HELLO_QUERY = gql`
  query {
    sayHello
  }
`;

function Hello() {
  const { loading, error, data } = useQuery(HELLO_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <h1>{data.sayHello}</h1>;
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Hello />
      </div>
    </ApolloProvider>
  );
}

export default App;
