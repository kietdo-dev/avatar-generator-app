import { useRef } from "react";

import type { CaptureService } from "@src/domain/ports/CaptureService";
import type { DownloadService } from "@src/domain/ports/DownloadService";

interface UseAvatarCaptureProps {
  captureService: CaptureService;
  downloadService: DownloadService;
}

export function useAvatarCapture({
  captureService,
  downloadService,
}: UseAvatarCaptureProps) {
  const captureRef = useRef<HTMLDivElement | null>(null);

  const handleCapture = async () => {
    if (!captureRef.current) {
      return;
    }

    try {
      const dataUrl = await captureService.captureElement(captureRef.current);
      downloadService.downloadImage(dataUrl, "avatar.png");
    } catch (error) {
      console.error("Error capturing screenshot:", error);
    }
  };

  return { captureRef, handleCapture };
}
