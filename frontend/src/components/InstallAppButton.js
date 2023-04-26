import React, { useEffect, useState } from "react";
import { useAddToHomescreenPrompt } from "../utils/utils";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { NavRightButton } from "./design-system/NavRightButton";
import InstallDesktopIcon from "@mui/icons-material/InstallDesktop";
import InstallMobileIcon from "@mui/icons-material/InstallMobile";
import { useMediaQuery } from "@mui/material";
import IosShareIcon from "@mui/icons-material/IosShare";

export default function InstallAppButton() {
  const isSmallScreen = useMediaQuery("(max-width:850px)");

  const [showButton, setShowButton] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const isIOS = () => {
      const userAgent = window.navigator.userAgent;
      return /iPhone|iPad|iPod/i.test(userAgent);
    };

    const isInStandaloneMode = () =>
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone;

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
      const userAgent = window.navigator.userAgent;
      const isChromiumDesktop =
        /Chrome|Chromium|Edg|Opera/.test(userAgent) &&
        !/Android/.test(userAgent);
      const isFirefoxDesktop =
        /Firefox/.test(userAgent) && !/Android/.test(userAgent);

      if (isChromiumDesktop) {
        const event = new Event("beforeinstallprompt");
        window.dispatchEvent(event);
        window.addEventListener("beforeinstallprompt", (e) => {
          e.preventDefault();
          setDeferredPrompt(e);
          setShowButton(true);
          e.prompt();
        });
      } else if (isFirefoxDesktop) {
        alert(
          'To install this app on Firefox, click the menu button and select "Install Website as App".'
        );
      } else {
        alert(
          'To install this app on your desktop: Open the browser menu and look for "Install App" or "Add to Home Screen" option.'
        );
      }
    }
  };
  return (
    showButton &&
    (!isSmallScreen ? (
      <NavRightButton
        onClick={handleButtonClick}
        MuiButtonIcon={isSmallScreen ? InstallMobileIcon : InstallDesktopIcon}
        name={"Install the app"}
      />
    ) : (
      <div style={{ position: "fixed", bottom: "12dvh", right: "2dvh" }}>
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip id="tooltip-add-to-home-screen">
              <span>
                To install this app on iOS, click the <IosShareIcon /> button
                and click "Add to Home Screen"
              </span>
            </Tooltip>
          }
        >
          <Button
            size="sm"
            className="text-white text-decoration-none rounded-5 d-flex align-items-center justify-content-center border-0 px-3 py-3"
            style={{
              backgroundColor: "rgba(0,0,0)",
              boxShadow: "2px 1px 2px rgba(0, 0, 0, 0.8)",
            }}
            onClick={handleButtonClick}
          >
            <InstallMobileIcon />
          </Button>
        </OverlayTrigger>
      </div>
    ))
  );
}
