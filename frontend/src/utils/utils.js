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
