import { useState, useEffect } from "react";
import { calculateLuminance } from "../utils/utils";

export function useImageProcessing(imageSrc) {
  const [background, setBackground] = useState("");
  const [textColor, setTextColor] = useState("white"); // set the initial text color to white
  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, img.width, img.height).data;
      const r = [],
        g = [],
        b = [];
      for (let i = 0; i < data.length; i += 4) {
        r.push(data[i]);
        g.push(data[i + 1]);
        b.push(data[i + 2]);
      }
      const averageColor = `rgb(${Math.round(
        r.reduce((a, b) => a + b) / r.length
      )},${Math.round(g.reduce((a, b) => a + b) / g.length)},${Math.round(
        b.reduce((a, b) => a + b) / b.length
      )})`;
      setBackground(averageColor);
      const luminance = calculateLuminance([
        r.reduce((a, b) => a + b) / r.length,
        g.reduce((a, b) => a + b) / g.length,
        b.reduce((a, b) => a + b) / b.length,
      ]);
      setTextColor(luminance < 0.5 ? "white" : "black");
    };
  }, [imageSrc]);

  return { background, textColor };
}
