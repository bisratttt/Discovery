import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function ToggleComponentsProvider({ children }) {
  const [openReview, setOpenReview] = useState(false);
  const [openSongInfo, setOpenSongInfo] = useState(false);
  const [openSongSubmissionList, setOpenSongSubmissionList] = useState(false);

  const contextValue = {
    openReview,
    setOpenReview,
    openSongInfo,
    setOpenSongInfo,
    openSongSubmissionList,
    setOpenSongSubmissionList,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useToggleComponents() {
  const setters = useContext(AppContext);
  return setters;
}