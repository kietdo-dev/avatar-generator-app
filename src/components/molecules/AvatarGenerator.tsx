import type { FC, RefObject } from "react";

import { ItemSelect } from "@src/components/atoms/ItemSelect";
import { Items } from "@src/constants/items";
import type { AvatarOptions } from "@src/interfaces";

import "@src/components/molecules/AvatarGenerator.css";

interface AvatarGeneratorProps {
  avatarOptions: AvatarOptions;
  updateAvatarOption: (feature: keyof AvatarOptions, value: string) => void;
  onRandomizeAvatar: () => void;
  captureRef: RefObject<HTMLDivElement>;
  handleCapture: () => void;
}

const AvatarGenerator: FC<AvatarGeneratorProps> = ({
  avatarOptions,
  updateAvatarOption,
  onRandomizeAvatar,
  captureRef,
  handleCapture,
}) => {
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
          {Object.entries(avatarOptions).map(([featureKey, value]) => (
            <ItemSelect
              key={featureKey}
              label={featureKey as keyof AvatarOptions}
              value={value}
              options={Items[featureKey as keyof typeof Items] as string[]}
              onChange={(feature, event) =>
                updateAvatarOption(feature as keyof AvatarOptions, event)
              }
            />
          ))}
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
