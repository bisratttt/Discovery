import { ApolloProvider } from "@apollo/client";
import React from "react";
import { useApolloClient } from "../hooks/useApolloClient";
import SongPage from "./SongPage";

export default function Details({ setShowNav }) {
  const client = useApolloClient();

  return (
    <ApolloProvider client={client}>
      <SongPage setShowNav={setShowNav} />
    </ApolloProvider>
  );
}
