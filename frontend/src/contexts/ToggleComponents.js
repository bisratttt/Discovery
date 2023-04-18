import { useMediaQuery } from "@mui/material";
import React, { createContext, useCallback, useContext, useState } from "react";

const AppContext = createContext();

export function ToggleComponentsProvider({ children }) {
  const isSmallScreen = useMediaQuery("(max-width:850px)");
  const [openReview, setOpenReview] = useState(false);
  const [openSongInfo, setOpenSongInfo] = useState({
    openInfo: !isSmallScreen,
    active_tab: "Artist",
  });
  const [openSongSubmissionList, setOpenSongSubmissionList] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const [openCookies, setOpenCookies] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const setOnlyOneStateTrue = useCallback(
    (clickedStateSetter) => {
      const setters = [
        setOpenReview,
        setOpenSongInfo,
        setOpenSongSubmissionList,
        setOpenProfile,
      ];
      for (const setter of setters) {
        setter((prevState) => {
          // setOpenSongInfo has a different data structure
          if (setter === setOpenSongInfo) {
            return clickedStateSetter === setter
              ? { ...prevState, openInfo: !prevState.openInfo }
              : { ...prevState, openInfo: false };
          }
          return clickedStateSetter === setter ? !prevState : false;
        });
      }
    },
    [setOpenReview, setOpenSongInfo, setOpenSongSubmissionList, setOpenProfile]
  );
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
    openProfile,
    setOpenProfile,
    setOnlyOneStateTrue,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useToggleComponents() {
  const setters = useContext(AppContext);
  return setters;
}
