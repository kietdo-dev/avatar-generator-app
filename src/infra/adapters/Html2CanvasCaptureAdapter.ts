import html2canvas from "html2canvas";
import type { CaptureService } from "@src/domain/ports/CaptureService";

export class Html2CanvasCaptureAdapter implements CaptureService {
  async captureElement(element: HTMLElement): Promise<string> {
    const canvas = await html2canvas(element, {
      useCORS: true,
      scale: 2,
    });
    return canvas.toDataURL("image/png");
  }
}