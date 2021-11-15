import '../styles/globals.css'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { createUploadLink } from 'apollo-upload-client';
import App from './index'

const client = new ApolloClient({
  link: createUploadLink({
    uri: 'http://localhost:8000/graphql'
  }),
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }) {
  

  
  return (
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  )
}

export default MyApp
