import AvatarGenerator from "@src/components/molecules/AvatarGenerator";
import { useAvatarGenerator } from "@src/hooks/useAvatarGenerator";

import "./App.css";

function App() {
  const {
    avatarOptions,
    updateAvatarOption,
    onRandomizeAvatar,
    captureRef,
    handleCapture,
  } = useAvatarGenerator();
  return (
    <div className="App">
      <AvatarGenerator
        avatarOptions={avatarOptions}
        updateAvatarOption={updateAvatarOption}
        onRandomizeAvatar={onRandomizeAvatar}
        captureRef={captureRef as React.RefObject<HTMLDivElement>}
        handleCapture={handleCapture}
      />
    </div>
  );
}

export default App;
