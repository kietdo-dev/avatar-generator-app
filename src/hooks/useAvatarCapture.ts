import { useRef } from "react";
import html2canvas from "html2canvas";

export function useAvatarCapture() {
  const captureRef = useRef<HTMLDivElement | null>(null);

  const handleCapture = () => {
    if (captureRef.current) {
      html2canvas(captureRef.current, {
        useCORS: true,
        scale: 2,
      })
        .then((canvas) => {
          const image = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = image;
          link.download = "avatar.png";
          link.click();
        })
        .catch((err) => {
          console.error("Error capturing screenshot:", err);
        });
    }
  };

  return { captureRef, handleCapture };
}
