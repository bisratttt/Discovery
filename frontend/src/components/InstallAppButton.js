import React, { useEffect, useState } from "react";
import { useAddToHomescreenPrompt } from "../utils/utils";
import { Button } from "react-bootstrap";
import { NavRightButton } from "./design-system/NavRightButton";
import InstallDesktopIcon from "@mui/icons-material/InstallDesktop";
import InstallMobileIcon from "@mui/icons-material/InstallMobile";
import { useMediaQuery } from "@mui/material";
export default function InstallAppButton() {
  const isSmallScreen = useMediaQuery("(max-width:850px)");

  const [showButton, setShowButton] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const isIOS = () => {
      const userAgent = window.navigator.userAgent;
      return /iPhone|iPad|iPod/i.test(userAgent);
    };

    const isInStandaloneMode = () => {
      return "standalone" in window.navigator && window.navigator.standalone;
    };

    if ("BeforeInstallPromptEvent" in window) {
      window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setShowButton(true);
      });
    } else if (!isIOS() && !isInStandaloneMode()) {
      setShowButton(true);
    }
  }, []);

  const handleButtonClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
      });
    } else {
      // Check if the browser is a Chromium-based desktop browser
      const isChromiumDesktop =
        /Chrome|Chromium|Edg|Opera/.test(window.navigator.userAgent) &&
        !/Android/.test(window.navigator.userAgent);

      if (isChromiumDesktop) {
        // Create a new 'beforeinstallprompt' event
        const event = new Event("beforeinstallprompt");
        window.dispatchEvent(event);
        window.addEventListener("beforeinstallprompt", (e) => {
          e.preventDefault();
          setDeferredPrompt(e);
          setShowButton(true);
          // Trigger the prompt
          e.prompt();
        });
      } else {
        alert(
          'To install this app on your desktop: Open the browser menu and look for "Install App" or "Add to Home Screen" option.'
        );
      }
    }
  };

  return (
    showButton && (
      <NavRightButton
        onClick={handleButtonClick}
        MuiButtonIcon={isSmallScreen ? InstallMobileIcon : InstallDesktopIcon}
        name={"Install the app"}
      />
    )
  );
}
