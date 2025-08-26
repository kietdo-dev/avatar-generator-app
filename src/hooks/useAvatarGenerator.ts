import type { AvatarOptions } from "@src/interfaces";

import { useAvatarCapture } from "./useAvatarCapture";
import { useAvatarOptionsState } from "./useAvatarOptionsState";
import { useAvatarRandomizer } from "./useAvatarRandomizer";

export function useAvatarGenerator(initial?: Partial<AvatarOptions>) {
  const { avatarOptions, setAvatarOptions, updateAvatarOption } =
    useAvatarOptionsState(initial);
  const { onRandomizeAvatar } = useAvatarRandomizer(setAvatarOptions);
  const { captureRef, handleCapture } = useAvatarCapture();
  return {
    avatarOptions,
    setAvatarOptions,
    updateAvatarOption,
    onRandomizeAvatar,
    captureRef,
    handleCapture,
  };
}
