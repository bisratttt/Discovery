import { useMediaQuery } from "@mui/material";
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function ToggleComponentsProvider({ children }) {
  const isSmallScreen = useMediaQuery("(max-width:850px)");
  const [openReview, setOpenReview] = useState(false);
  const [openSongInfo, setOpenSongInfo] = useState(!isSmallScreen);
  const [openSongSubmissionList, setOpenSongSubmissionList] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const [openCookies, setOpenCookies] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const contextValue = {
    openReview,
    setOpenReview,
    openSongInfo,
    setOpenSongInfo,
    openSongSubmissionList,
    setOpenSongSubmissionList,
    openTerms,
    setOpenTerms,
    openCookies,
    setOpenCookies,
    openLoginModal,
    setOpenLoginModal,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useToggleComponents() {
  const setters = useContext(AppContext);
  return setters;
}
