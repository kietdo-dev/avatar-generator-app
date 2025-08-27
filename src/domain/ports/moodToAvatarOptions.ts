import type { AvatarOptions } from "@src/interfaces";

export const moodOptions = [
  "Happy",
  "Sad",
  "Angry",
  "Excited",
  "Sleepy",
  "Funny",
  "Surprised",
  "Neutral",
] as const;
export type MoodOption = (typeof moodOptions)[number];

const moodToAvatarOptionsMap: Record<MoodOption, AvatarOptions> = {
  Happy: {
    eyes: "normal",
    nose: "normal",
    mouth: "smile",
    hairStyle: "short",
    hairColor: "brown",
    skinColor: "light",
    eyebrows: "normal",
  },
  Sad: {
    eyes: "small",
    nose: "normal",
    mouth: "frown",
    hairStyle: "short",
    hairColor: "brown",
    skinColor: "light",
    eyebrows: "thin",
  },
  Angry: {
    eyes: "normal",
    nose: "normal",
    mouth: "frown",
    hairStyle: "spiky",
    hairColor: "black",
    skinColor: "light",
    eyebrows: "angry",
  },
  Excited: {
    eyes: "big",
    nose: "normal",
    mouth: "smile",
    hairStyle: "curly",
    hairColor: "blonde",
    skinColor: "light",
    eyebrows: "raised",
  },
  Sleepy: {
    eyes: "sleepy",
    nose: "normal",
    mouth: "neutral",
    hairStyle: "bald",
    hairColor: "gray",
    skinColor: "light",
    eyebrows: "normal",
  },
  Funny: {
    eyes: "big",
    nose: "button",
    mouth: "laugh",
    hairStyle: "curly",
    hairColor: "pink",
    skinColor: "light",
    eyebrows: "thick",
  },
  Surprised: {
    eyes: "normal",
    nose: "pointed",
    mouth: "surprised",
    hairStyle: "long",
    hairColor: "red",
    skinColor: "light",
    eyebrows: "raised",
  },
  Neutral: {
    eyes: "normal",
    nose: "normal",
    mouth: "neutral",
    hairStyle: "short",
    hairColor: "brown",
    skinColor: "light",
    eyebrows: "normal",
  },
};

export function getAvatarOptionsForMood(mood: MoodOption): AvatarOptions {
  return moodToAvatarOptionsMap[mood] || moodToAvatarOptionsMap["Neutral"];
}
