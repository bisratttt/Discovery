import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();
// context for any data that is fetched for the app if used at different parts
export function FetchDataProvider({ children }) {
  const [reactionCounts, setReactionCounts] = useState({});
  const [submissionReactionCounts, setSubmissionReactionCounts] = useState({});
  const contextValue = {
    reactionCounts,
    setReactionCounts,
    submissionReactionCounts,
    setSubmissionReactionCounts,
  };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useFetchData() {
  const setters = useContext(AppContext);
  return setters;
}
