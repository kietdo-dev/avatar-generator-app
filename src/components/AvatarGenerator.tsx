import { useState, type FC } from 'react';
import './AvatarGenerator.css';

interface AvatarOptions {
  eyes: string;
  nose: string;
  mouth: string;
  hairStyle: string;
  hairColor: string;
  skinColor: string;
  eyebrows: string;
}

const AvatarGenerator: FC = () => {
  const [avatarOptions, setAvatarOptions] = useState<AvatarOptions>({
    eyes: 'normal',
    nose: 'normal',
    mouth: 'smile',
    hairStyle: 'short',
    hairColor: 'brown',
    skinColor: 'light',
    eyebrows: 'normal'
  });

  const updateAvatarOption = (feature: keyof AvatarOptions, value: string) => {
    setAvatarOptions(prev => ({
      ...prev,
      [feature]: value
    }));
  };

  const onRandomizeAvatar = () => {
     const eyeOptions = ['normal', 'big', 'small', 'sleepy', 'wink'];
              const noseOptions = ['normal', 'big', 'small', 'pointed', 'button'];
              const mouthOptions = ['smile', 'neutral', 'frown', 'laugh', 'surprised', 'kiss'];
              const hairStyleOptions = ['short', 'long', 'curly', 'bald', 'spiky', 'ponytail'];
              const hairColorOptions = ['brown', 'black', 'blonde', 'red', 'gray', 'blue', 'pink'];
              const skinColorOptions = ['light', 'medium', 'dark', 'tan'];
              const eyebrowOptions = ['normal', 'thick', 'thin', 'raised', 'angry'];

              setAvatarOptions({
                eyes: eyeOptions[Math.floor(Math.random() * eyeOptions.length)],
                nose: noseOptions[Math.floor(Math.random() * noseOptions.length)],
                mouth: mouthOptions[Math.floor(Math.random() * mouthOptions.length)],
                hairStyle: hairStyleOptions[Math.floor(Math.random() * hairStyleOptions.length)],
                hairColor: hairColorOptions[Math.floor(Math.random() * hairColorOptions.length)],
                skinColor: skinColorOptions[Math.floor(Math.random() * skinColorOptions.length)],
                eyebrows: eyebrowOptions[Math.floor(Math.random() * eyebrowOptions.length)]
              });
  }

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
              <div className={`eyebrows eyebrows-${avatarOptions.eyebrows}`}></div>
              
              {/* Eyes */}
              <div className={`eyes eyes-${avatarOptions.eyes}`}>
                <div className="eye left-eye">
                  <div className="pupil"></div>
                </div>
                <div className="eye right-eye">
                  <div className="pupil"></div>
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
          <h2>Customize Your Avatar</h2>
          
          <div className="control-group">
            <label>Eyes:</label>
            <select 
              value={avatarOptions.eyes} 
              onChange={(e) => updateAvatarOption('eyes', e.target.value)}
            >
              <option value="normal">Normal</option>
              <option value="big">Big</option>
              <option value="small">Small</option>
              <option value="sleepy">Sleepy</option>
              <option value="wink">Wink</option>
            </select>
          </div>

          <div className="control-group">
            <label>Eyebrows:</label>
            <select 
              value={avatarOptions.eyebrows} 
              onChange={(e) => updateAvatarOption('eyebrows', e.target.value)}
            >
              <option value="normal">Normal</option>
              <option value="thick">Thick</option>
              <option value="thin">Thin</option>
              <option value="raised">Raised</option>
              <option value="angry">Angry</option>
            </select>
          </div>

          <div className="control-group">
            <label>Nose:</label>
            <select 
              value={avatarOptions.nose} 
              onChange={(e) => updateAvatarOption('nose', e.target.value)}
            >
              <option value="normal">Normal</option>
              <option value="big">Big</option>
              <option value="small">Small</option>
              <option value="pointed">Pointed</option>
              <option value="button">Button</option>
            </select>
          </div>

          <div className="control-group">
            <label>Mouth:</label>
            <select 
              value={avatarOptions.mouth} 
              onChange={(e) => updateAvatarOption('mouth', e.target.value)}
            >
              <option value="smile">Smile</option>
              <option value="neutral">Neutral</option>
              <option value="frown">Frown</option>
              <option value="laugh">Laugh</option>
              <option value="surprised">Surprised</option>
              <option value="kiss">Kiss</option>
            </select>
          </div>

          <div className="control-group">
            <label>Hair Style:</label>
            <select 
              value={avatarOptions.hairStyle} 
              onChange={(e) => updateAvatarOption('hairStyle', e.target.value)}
            >
              <option value="short">Short</option>
              <option value="long">Long</option>
              <option value="curly">Curly</option>
              <option value="bald">Bald</option>
              <option value="spiky">Spiky</option>
              <option value="ponytail">Ponytail</option>
            </select>
          </div>

          <div className="control-group">
            <label>Skin Color:</label>
            <select 
              value={avatarOptions.skinColor} 
              onChange={(e) => updateAvatarOption('skinColor', e.target.value)}
            >
              <option value="light">Light</option>
              <option value="medium">Medium</option>
              <option value="dark">Dark</option>
              <option value="tan">Tan</option>
            </select>
          </div>

          <button 
            className="randomize-btn"
            onClick={onRandomizeAvatar}
          >
            🎲 Randomize Avatar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarGenerator;
