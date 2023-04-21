import React from "react";
import { useAddToHomescreenPrompt } from "../utils/utils";
import { Button } from "react-bootstrap";
import { NavRightButton } from "./design-system/NavRightButton";
import InstallDesktopIcon from "@mui/icons-material/InstallDesktop";
import InstallMobileIcon from "@mui/icons-material/InstallMobile";
import { useMediaQuery } from "@mui/material";
export default function InstallAppButton() {
  const isSmallScreen = useMediaQuery("(max-width:850px)");

  const [prompt, promptToInstall] = useAddToHomescreenPrompt();
  return (
    <NavRightButton
      onClick={promptToInstall}
      MuiButtonIcon={isSmallScreen ? InstallMobileIcon : InstallDesktopIcon}
      name={"Install the app"}
    />
  );
}
