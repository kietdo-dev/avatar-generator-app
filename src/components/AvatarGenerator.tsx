import { useState, type FC } from "react";
import "./AvatarGenerator.css";
import { Items } from "@src/constants/items";
import type { AvatarOptions } from "@src/interfaces";
import { ItemSelect } from "@src/components/atoms/ItemSelect";

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
    console.log(`Updating ${feature} to ${value}`);

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

  return (
    <div className="avatar-generator">
      <h1>Avatar Generator</h1>

      <div className="generator-container">
        {/* Avatar Display */}
        <div className="avatar-display">
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
          {Object.entries(avatarOptions).map(([feature, value]) => (
            <ItemSelect
              key={feature}
              label={feature as keyof AvatarOptions}
              value={value}
              options={Items[`${feature}` as keyof typeof Items] as string[]}
              onChange={(event) =>
                updateAvatarOption(feature as keyof AvatarOptions, event)
              }
            />
          ))}
        </div>
         <button className="randomize-btn" onClick={onRandomizeAvatar}>
            🎲 Randomize Avatar
          </button>
      </div>
    </div>
  );
};

export default AvatarGenerator;
