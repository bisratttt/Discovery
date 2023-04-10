import { ApolloProvider } from "@apollo/client";
import React from "react";
import { useApolloClient } from "../hooks/useApolloClient";
import Page from "./SongPage";

export default function Details() {
  const client = useApolloClient();

  return (
    <ApolloProvider client={client}>
      <Page />
    </ApolloProvider>
  );
}
