import {
  faYoutube,
  faInstagram,
  faFacebook,
  faTiktok,
  faTwitter,
  faSpotify,
  faItunes,
  faSoundcloud,
} from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
export function calculateLuminance(rgb) {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance;
}

export function getMetaphorialTime(timestamp) {
  // Get the current timestamp in milliseconds
  const currentTime = new Date().getTime();

  // Assuming your timestamp is stored in a variable called `timestamp`
  const timestampInSeconds = Math.floor(
    (currentTime - new Date(timestamp).getTime()) / 1000
  );

  let formattedTimestamp;

  if (timestampInSeconds < 60) {
    // Show the time difference in seconds
    formattedTimestamp = `${timestampInSeconds}s ago`;
  } else if (timestampInSeconds < 3600) {
    // Show the time difference in minutes
    const timestampInMinutes = Math.floor(timestampInSeconds / 60);
    formattedTimestamp = `${timestampInMinutes}m ago`;
  } else {
    // Show the time difference in hours and minutes
    const timestampDate = new Date(timestamp);
    formattedTimestamp = timestampDate.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }

  return formattedTimestamp;
}
// Taken from: https://gist.github.com/rikukissa/cb291a4a82caa670d2e0547c520eae53
export function useAddToHomescreenPrompt() {
  const [prompt, setState] = useState(null);

  const promptToInstall = () => {
    if (prompt) {
      return prompt.prompt();
    }
    return Promise.reject(
      new Error(
        'Tried installing before browser sent "beforeinstallprompt" event'
      )
    );
  };

  useEffect(() => {
    const ready = (e) => {
      e.preventDefault();
      setState(e);
    };

    window.addEventListener("beforeinstallprompt", ready);

    return () => {
      window.removeEventListener("beforeinstallprompt", ready);
    };
  }, []);

  return [prompt, promptToInstall];
}
export const getPlatformIcon = (platform) => {
  switch (platform) {
    case "youtube":
      return faYoutube;
    case "instagram":
      return faInstagram;
    case "facebook":
      return faFacebook;
    case "tiktok":
      return faTiktok;
    case "twitter":
      return faTwitter;
    case "spotify":
      return faSpotify;
    case "apple_music":
      return faItunes;
    case "soundcloud":
      return faSoundcloud;
    default:
      return null;
  }
};
export function formatCount(count) {
  const suffixes = ["", "k", "m", "b", "t"];
  const suffixIndex = Math.floor((count.toString().length - 1) / 3);
  const suffix = suffixes[suffixIndex];

  const shortCount = count / Math.pow(10, suffixIndex * 3);
  const roundedCount = Math.round(shortCount * 10) / 10;

  return roundedCount.toString() + suffix;
}
