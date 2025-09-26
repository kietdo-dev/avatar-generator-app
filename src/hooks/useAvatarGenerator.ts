import { BrowserDownloadAdapter } from "@src/infra/adapters/BrowserDownloadAdapter";
import { Html2CanvasCaptureAdapter } from "@src/infra/adapters/Html2CanvasCaptureAdapter";
import type { AvatarOptions } from "@src/interfaces";

import { useAvatarCapture } from "./useAvatarCapture";
import { useAvatarOptionsState } from "./useAvatarOptionsState";
import { useAvatarRandomizer } from "./useAvatarRandomizer";

export function useAvatarGenerator(initial?: Partial<AvatarOptions>) {
  const { avatarOptions, setAvatarOptions, updateAvatarOption } =
    useAvatarOptionsState(initial);
  const { onRandomizeAvatar } = useAvatarRandomizer(setAvatarOptions);
  const { captureRef, handleCapture } = useAvatarCapture({
    captureService: new Html2CanvasCaptureAdapter(),
    downloadService: new BrowserDownloadAdapter(),
  });

  return {
    avatarOptions,
    setAvatarOptions,
    updateAvatarOption,
    onRandomizeAvatar,
    captureRef,
    handleCapture,
  };
}
