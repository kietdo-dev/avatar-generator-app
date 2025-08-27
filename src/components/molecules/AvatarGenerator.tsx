import type { FC, RefObject } from "react";

import { ExpressionCard } from "@src/components/atoms/ExpressionCard";
import { ExpressionLabel } from "@src/components/atoms/ExpressionLabel";
import { ItemSelect } from "@src/components/atoms/ItemSelect";
import { Items } from "@src/constants/items";
import { detectExpression } from "@src/domain/ports/detectExpression";
import type { AvatarFeatureKey, AvatarOptions } from "@src/interfaces";

import "@src/components/molecules/AvatarGenerator.css";

interface AvatarGeneratorProps {
  avatarOptions: AvatarOptions;
  updateAvatarOption: (feature: AvatarFeatureKey, value: string) => void;
  onRandomizeAvatar: () => void;
  captureRef: RefObject<HTMLDivElement>;
  handleCapture: () => void;
  moodSelect?: React.ReactNode;
}

const AvatarGenerator: FC<AvatarGeneratorProps> = ({
  avatarOptions,
  updateAvatarOption,
  onRandomizeAvatar,
  captureRef,
  moodSelect,
  handleCapture,
}) => {
  const expression = detectExpression(avatarOptions);
  return (
    <div className="avatar-generator">
      <h1>Avatar Generator</h1>
      <div className="generator-container">
        {/* MoodSelect and Expression Label as Card */}
        <ExpressionCard>
          {moodSelect}
          <ExpressionLabel expression={expression} />
        </ExpressionCard>
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
          {Object.entries(avatarOptions).map(([featureKey, value]) => {
            const featureKeyTyped = featureKey as AvatarFeatureKey;
            return (
              <ItemSelect<AvatarFeatureKey>
                key={featureKeyTyped}
                label={featureKeyTyped}
                value={value}
                options={Items[featureKeyTyped]}
                onChange={(feature, event) =>
                  updateAvatarOption(feature, event)
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
