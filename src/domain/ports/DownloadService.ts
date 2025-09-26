export interface DownloadService {
  downloadImage(dataUrl: string, filename: string): void;
}