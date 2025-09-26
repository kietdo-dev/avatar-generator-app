import type { FC } from "react";

import {
  type MoodOption,
  moodOptions,
} from "@src/domain/ports/moodToAvatarOptions";

interface MoodSelectProps {
  value: MoodOption;
  onChange: (mood: MoodOption) => void;
}

export const MoodSelect: FC<MoodSelectProps> = ({ value, onChange }) => (
  <div className="control-group">
    <label htmlFor="mood-select">Mood:</label>
    <select
      id="mood-select"
      value={value}
      onChange={(e) => onChange(e.target.value as MoodOption)}
    >
      {moodOptions.map((mood) => (
        <option key={mood} value={mood}>
          {mood}
        </option>
      ))}
    </select>
  </div>
);
