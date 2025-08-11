import { useRef, useState, type FC } from "react";
import "./AvatarGenerator.css";
import { Items } from "@src/constants/items";
import type { AvatarOptions } from "@src/interfaces";
import { ItemSelect } from "@src/components/atoms/ItemSelect";
import html2canvas from "html2canvas";

const AvatarGenerator: FC = () => {
  const [avatarOptions, setAvatarOptions] = useState<AvatarOptions>({
    eyes: "normal",
    nose: "normal",
    mouth: "smile",
    hairStyle: "short",
    hairColor: "brown",
    skinColor: "light",
    eyebrows: "normal",
  });

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
        scale: 2, // Increase resolution
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
  return (
    <div className="avatar-generator">
      <h1>Avatar Generator</h1>

      <div className="generator-container">
        {/* Avatar Display */}
        <div className="avatar-display" ref={captureRef}>
          <div className="avatar">
            {/* Head */}
            <div className={`head skin-${avatarOptions.skinColor}`}>
              {/* Eyebrows */}
              <div className={`eyebrows eyebrows-${avatarOptions.eyebrows}`} />

              {/* Eyes */}
              <div className={`eyes eyes-${avatarOptions.eyes}`}>
                <div className="eye left-eye">
                  <div className="pupil" />
                </div>
                <div className="eye right-eye">
                  <div className="pupil" />
                </div>
              </div>

              {/* Nose */}
              <div className={`nose nose-${avatarOptions.nose}`} />

              {/* Mouth */}
              <div className={`mouth mouth-${avatarOptions.mouth}`} />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="avatar-controls">
          {Object.entries(avatarOptions).map(([feature, value]) => {
            console.log(`Rendering ${feature} with value ${value}`);
            return (
              <ItemSelect
                key={feature}
                label={feature as keyof AvatarOptions}
                value={value}
                options={Items[`${feature}` as keyof typeof Items] as string[]}
                onChange={(feature, event) =>
                  updateAvatarOption(feature as keyof AvatarOptions, event)
                }
              />
            );
          })}
        </div>
       
      </div>

      <div className="button-container">
         <button className="randomize-btn" onClick={onRandomizeAvatar}>
          🎲 Randomize Avatar
        </button>
        <button className="randomize-btn" onClick={handleCapture}>
          📸 Capture Avatar
        </button>
       </div>
    </div>
  );
};

export default AvatarGenerator;
