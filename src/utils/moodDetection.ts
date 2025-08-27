export interface MoodDetection {
  mood: string;
  confidence: number;
  description: string;
  emoji: string;
}

export interface MoodAnalysis {
  primary: MoodDetection;
  secondary?: MoodDetection;
  traits: string[];
}

// Mood scoring weights for different features
const MOOD_WEIGHTS = {
  mouth: 0.5,    // Mouth has highest impact on mood
  eyebrows: 0.3, // Eyebrows are second most important
  eyes: 0.2      // Eyes provide supporting context
};

// Mood definitions with feature combinations
const MOOD_PATTERNS = {
  happy: {
    mouth: ["smile", "laugh", "grin"],
    eyebrows: ["normal", "raised"],
    eyes: ["normal", "big", "wide"],
    emoji: "😊",
    description: "Cheerful and positive"
  },
  sad: {
    mouth: ["frown", "neutral"],
    eyebrows: ["normal", "thin"],
    eyes: ["small", "sleepy", "droopy"],
    emoji: "😢",
    description: "Melancholy or downcast"
  },
  angry: {
    mouth: ["frown", "neutral"],
    eyebrows: ["angry", "thick"],
    eyes: ["normal", "small"],
    emoji: "😠",
    description: "Frustrated or irritated"
  },
  surprised: {
    mouth: ["surprised", "open"],
    eyebrows: ["raised", "normal"],
    eyes: ["big", "wide"],
    emoji: "😲",
    description: "Shocked or amazed"
  },
  playful: {
    mouth: ["smirk", "kiss", "grin"],
    eyebrows: ["raised", "arched"],
    eyes: ["wink", "normal"],
    emoji: "😏",
    description: "Mischievous and fun-loving"
  },
  sleepy: {
    mouth: ["neutral", "small"],
    eyebrows: ["normal", "thin"],
    eyes: ["sleepy", "droopy", "small"],
    emoji: "😴",
    description: "Tired or drowsy"
  },
  confident: {
    mouth: ["smirk", "smile"],
    eyebrows: ["thick", "normal"],
    eyes: ["normal", "big"],
    emoji: "😎",
    description: "Self-assured and bold"
  },
  romantic: {
    mouth: ["kiss", "smile"],
    eyebrows: ["arched", "normal"],
    eyes: ["normal", "droopy"],
    emoji: "😘",
    description: "Loving and affectionate"
  },
  neutral: {
    mouth: ["neutral"],
    eyebrows: ["normal"],
    eyes: ["normal"],
    emoji: "😐",
    description: "Calm and composed"
  }
};

export function detectMood(avatarOptions: {
  mouth: string;
  eyebrows: string;
  eyes: string;
}): MoodAnalysis {
  const scores: { [mood: string]: number } = {};
  
  // Calculate mood scores based on feature matches
  Object.entries(MOOD_PATTERNS).forEach(([mood, pattern]) => {
    let score = 0;
    
    // Check mouth match
    if (pattern.mouth.includes(avatarOptions.mouth)) {
      score += MOOD_WEIGHTS.mouth;
    }
    
    // Check eyebrows match
    if (pattern.eyebrows.includes(avatarOptions.eyebrows)) {
      score += MOOD_WEIGHTS.eyebrows;
    }
    
    // Check eyes match
    if (pattern.eyes.includes(avatarOptions.eyes)) {
      score += MOOD_WEIGHTS.eyes;
    }
    
    scores[mood] = score;
  });
  
  // Sort moods by score
  const sortedMoods = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .filter(([, score]) => score > 0);
  
  // Get primary mood
  const primaryMood = sortedMoods[0]?.[0] || 'neutral';
  const primaryScore = sortedMoods[0]?.[1] || 0;
  
  // Get secondary mood if significantly different
  const secondaryMood = sortedMoods[1];
  const hasSecondary = secondaryMood && 
    secondaryMood[1] > 0.3 && 
    Math.abs(primaryScore - secondaryMood[1]) < 0.3;
  
  // Determine traits based on individual features
  const traits: string[] = [];
  
  if (avatarOptions.eyes === 'wink') traits.push('flirtatious');
  if (avatarOptions.eyebrows === 'thick') traits.push('expressive');
  if (avatarOptions.mouth === 'laugh') traits.push('joyful');
  if (avatarOptions.eyes === 'big') traits.push('alert');
  if (avatarOptions.eyebrows === 'raised') traits.push('curious');
  
  const pattern = MOOD_PATTERNS[primaryMood as keyof typeof MOOD_PATTERNS];
  
  return {
    primary: {
      mood: primaryMood,
      confidence: Math.min(primaryScore, 1.0),
      description: pattern.description,
      emoji: pattern.emoji
    },
    secondary: hasSecondary ? {
      mood: secondaryMood[0],
      confidence: Math.min(secondaryMood[1], 1.0),
      description: MOOD_PATTERNS[secondaryMood[0] as keyof typeof MOOD_PATTERNS].description,
      emoji: MOOD_PATTERNS[secondaryMood[0] as keyof typeof MOOD_PATTERNS].emoji
    } : undefined,
    traits
  };
}

export function getMoodColor(mood: string): string {
  const colors: { [key: string]: string } = {
    happy: '#FFD700',      // Gold
    sad: '#6495ED',        // Cornflower Blue
    angry: '#FF6B6B',      // Light Red
    surprised: '#FF8C00',  // Dark Orange
    playful: '#FF69B4',    // Hot Pink
    sleepy: '#DDA0DD',     // Plum
    confident: '#32CD32',  // Lime Green
    romantic: '#FF1493',   // Deep Pink
    neutral: '#D3D3D3'     // Light Gray
  };
  
  return colors[mood] || colors.neutral;
}
