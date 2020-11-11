import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const httpUri = process.env.REACT_APP_SERVER_URL + '/graphql';

const inMemoryCache = new InMemoryCache();

export default new ApolloClient({
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  //@ts-ignore
  link: createUploadLink({
    uri: httpUri,
    credentials: 'include'
  }),
  cache: inMemoryCache
});
