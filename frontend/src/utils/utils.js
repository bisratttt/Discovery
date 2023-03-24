export function calculateLuminance(rgb) {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance;
}
