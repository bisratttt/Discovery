import { useMemo } from "react";
import { useRealmApp } from "../contexts/RealmApp";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import appConfig from "../realm.json";
import jwt_decode from "jwt-decode";

const { baseUrl } = appConfig;

export function useApolloClient() {
  const realmApp = useRealmApp();
  if (!realmApp.currentUser) {
    throw new Error(`You must be logged in to Realm to call useApolloClient()`);
  }

  const client = useMemo(() => {
    const graphqlUri = `${baseUrl}/api/client/v2.0/app/${realmApp.id}/graphql`;
    // Local apps should use a local URI!
    // const graphqlUri = `https://us-east-1.aws.stitch.mongodb.com/api/client/v2.0/app/${realmApp.id}/graphql`

    async function getValidAccessToken() {
      // An already logged in user's access token might be expired. We decode the token and check its
      // expiration to find out whether or not their current access token is stale.
      const { exp } = jwt_decode(realmApp.currentUser.accessToken);
      const isExpired = Date.now() >= exp * 1000;
      if (isExpired) {
        // To manually refresh the user's expired access token, we refresh their custom data
        await realmApp.currentUser.refreshCustomData();
      }
      // The user's access token is now guaranteed to be valid (unless their account is disabled or deleted)
      return realmApp.currentUser.accessToken;
    }

    return new ApolloClient({
      link: new HttpLink({
        uri: graphqlUri,
        // We define a custom fetch handler for the Apollo client that lets us authenticate GraphQL requests.
        // The function intercepts every Apollo HTTP request and adds an Authorization header with a valid
        // access token before sending the request.
        fetch: async (uri, options) => {
          const accessToken = await getValidAccessToken();
          options.headers.Authorization = `Bearer ${accessToken}`;
          return fetch(uri, options);
        },
      }),
      cache: new InMemoryCache(),
    });
  }, [realmApp.currentUser, realmApp.id]);

  return client;
}
