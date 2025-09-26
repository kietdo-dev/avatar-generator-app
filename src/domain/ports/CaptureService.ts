export interface CaptureService {
  captureElement(element: HTMLElement): Promise<string>;
}