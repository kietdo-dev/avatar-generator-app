import { useRef, useState } from "react";
import html2canvas from "html2canvas";

import { Items } from "@src/constants/items";
import type { AvatarOptions } from "@src/interfaces";

export function useAvatarGenerator(
  initial: AvatarOptions = {
    eyes: "normal",
    nose: "normal",
    mouth: "smile",
    hairStyle: "short",
    hairColor: "brown",
    skinColor: "light",
    eyebrows: "normal",
  }
) {
  const [avatarOptions, setAvatarOptions] = useState<AvatarOptions>(initial);

  const updateAvatarOption = (feature: keyof AvatarOptions, value: string) => {
    setAvatarOptions((prev) => ({
      ...prev,
      [feature]: value,
    }));
  };

  const onRandomItem = (items: string[]) => {
    return items[Math.floor(Math.random() * items.length)];
  };

  const onRandomizeAvatar = () => {
    setAvatarOptions({
      eyes: onRandomItem(Items.eyes),
      nose: onRandomItem(Items.nose),
      mouth: onRandomItem(Items.mouth),
      hairStyle: onRandomItem(Items.hairStyle),
      hairColor: onRandomItem(Items.hairColor),
      skinColor: onRandomItem(Items.skinColor),
      eyebrows: onRandomItem(Items.eyebrows),
    });
  };

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

  return {
    avatarOptions,
    setAvatarOptions,
    updateAvatarOption,
    onRandomizeAvatar,
    captureRef,
    handleCapture,
  };
}
