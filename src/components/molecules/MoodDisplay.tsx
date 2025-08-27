import { type FC } from 'react';
import { type MoodAnalysis, getMoodColor } from '@src/utils/moodDetection';
import './MoodDisplay.css';

interface MoodDisplayProps {
  moodAnalysis: MoodAnalysis;
}

export const MoodDisplay: FC<MoodDisplayProps> = ({ moodAnalysis }) => {
  const { primary, secondary, traits } = moodAnalysis;
  
  return (
    <div className="mood-display">
      <div className="mood-header">
        <h3>🎭 Mood Analysis</h3>
      </div>
      
      <div className="mood-primary">
        <div 
          className="mood-indicator"
          style={{ backgroundColor: getMoodColor(primary.mood) }}
        >
          <span className="mood-emoji">{primary.emoji}</span>
        </div>
        <div className="mood-info">
          <div className="mood-name">{primary.mood.charAt(0).toUpperCase() + primary.mood.slice(1)}</div>
          <div className="mood-description">{primary.description}</div>
          <div className="mood-confidence">
            Confidence: {Math.round(primary.confidence * 100)}%
          </div>
        </div>
      </div>
      
      {secondary && (
        <div className="mood-secondary">
          <div className="mood-label">Secondary mood:</div>
          <div className="mood-secondary-content">
            <span className="mood-emoji-small">{secondary.emoji}</span>
            <span className="mood-name-small">{secondary.mood}</span>
            <span className="mood-confidence-small">
              ({Math.round(secondary.confidence * 100)}%)
            </span>
          </div>
        </div>
      )}
      
      {traits.length > 0 && (
        <div className="mood-traits">
          <div className="traits-label">Personality traits:</div>
          <div className="traits-list">
            {traits.map((trait, index) => (
              <span key={index} className="trait-tag">
                {trait}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="mood-explanation">
        <small>
          💡 Mood detected based on facial expression combination
        </small>
      </div>
    </div>
  );
};
