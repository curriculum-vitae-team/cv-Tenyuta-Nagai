import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { authService } from './authentication/authService';
import { notificationService } from './notification/notificationService';

const httpLink = new HttpLink({
  uri: 'https://cv-project-js.inno.ws/api/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${authService.access_token$()}`,
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      notificationService.openErrorAlert(message);
      console.error('graphQLErrors', message);
      if (message === 'Unauthorized') {
        authService.clearStorage();
      }
    });
  }
  if (networkError) {
    notificationService.openErrorAlert(networkError.message);
    console.error('networkError', networkError.message);
  }
});

export const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});
