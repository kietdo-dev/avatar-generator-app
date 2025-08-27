import { useState } from "react";

import { MoodSelect } from "@src/components/atoms/MoodSelect";
import {
  getAvatarOptionsForMood,
  type MoodOption,
  moodOptions,
} from "@src/domain/ports/moodToAvatarOptions";

import AvatarGenerator from "./components/molecules/AvatarGenerator";
import { useAvatarGenerator } from "./hooks/useAvatarGenerator";

import "./App.css";

function App() {
  const [selectedMood, setSelectedMood] = useState<MoodOption>(moodOptions[0]);
  const {
    avatarOptions,
    setAvatarOptions,
    updateAvatarOption,
    onRandomizeAvatar,
    captureRef,
    handleCapture,
  } = useAvatarGenerator(getAvatarOptionsForMood(selectedMood));

  // When mood changes, update all avatar options to match mood
  const handleMoodChange = (mood: MoodOption) => {
    setSelectedMood(mood);
    setAvatarOptions(getAvatarOptionsForMood(mood));
  };

  return (
    <div className="App">
      <AvatarGenerator
        avatarOptions={avatarOptions}
        updateAvatarOption={updateAvatarOption}
        onRandomizeAvatar={onRandomizeAvatar}
        captureRef={captureRef as React.RefObject<HTMLDivElement>}
        handleCapture={handleCapture}
        moodSelect={
          <MoodSelect value={selectedMood} onChange={handleMoodChange} />
        }
      />
    </div>
  );
}

export default App;
