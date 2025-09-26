import type { DownloadService } from "@src/domain/ports/DownloadService";

export class BrowserDownloadAdapter implements DownloadService {
  downloadImage(dataUrl: string, filename: string): void {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    link.click();
  }
}
