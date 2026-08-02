export const SECRET_SEQUENCE = [
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowRight',
  'ArrowLeft',
  'ArrowDown',
  'ArrowUp',
];

// The opening narration is one continuous recording. Scene boundaries below
// mirror the spoken cue points so the typography follows the performance
// without seeking, cropping, or restarting the audio file.
export const SCENES = [
  {
    key: 'loading',
    type: 'loading',
    duration: 2600,
    lines: ['LIGHTING A CANDLE'],
  },
  {
    key: 'candle-ignition',
    type: 'candle',
    duration: 1550,
    lines: [],
  },
  {
    key: 'narration-lead',
    type: 'narration-lead',
    duration: 1500,
    lines: [],
  },
  {
    key: 'summons',
    type: 'text',
    duration: 6500,
    tone: 'whisper',
    lineDelay: 0,
    exitDelay: 5.55,
    lines: ['The Loop beckons once more...'],
  },
  {
    key: 'pain-cleanses',
    type: 'text',
    duration: 5000,
    tone: 'doctrine doctrine-single',
    lineDelay: 0,
    exitDelay: 4.05,
    lines: ['Pain cleanses.'],
  },
  {
    key: 'distance-redeems',
    type: 'text',
    duration: 5000,
    tone: 'doctrine doctrine-single',
    lineDelay: 0,
    exitDelay: 4.05,
    lines: ['Distance redeems.'],
  },
  {
    key: 'through-suffering',
    type: 'text',
    duration: 2000,
    tone: 'doctrine doctrine-single',
    lineDelay: 0,
    exitDelay: 1.15,
    lines: ['Through suffering,'],
  },
  {
    key: 'become-one',
    type: 'text',
    duration: 7000,
    tone: 'doctrine doctrine-single doctrine-final',
    lineDelay: 0,
    lines: ['We become one.'],
  },
  {
    key: 'flicker-two',
    type: 'blackout',
    duration: 1150,
    lines: [],
  },
  {
    key: 'no-prizes',
    type: 'text',
    duration: 3000,
    tone: 'rule rule-single',
    lineDelay: 0,
    exitDelay: 2.1,
    lines: ['No prizes.'],
  },
  {
    key: 'no-podium',
    type: 'text',
    duration: 3500,
    tone: 'rule rule-single',
    lineDelay: 0,
    exitDelay: 2.6,
    lines: ['No podium.'],
  },
  {
    key: 'just-insanity',
    type: 'text',
    duration: 2500,
    tone: 'rule rule-single rule-final',
    lineDelay: 0,
    exitDelay: 1.65,
    lines: ['Just insanity.'],
  },
  {
    key: 'closing',
    type: 'final',
    duration: null,
    tone: 'closing',
    lines: ['Scenic Loop Insanity III approaches.', 'Will you join the madness?'],
  },
];

export const LOADING_SCENE_INDEX = 0;
export const CANDLE_SCENE_INDEX = 1;
export const NARRATION_START_SCENE_INDEX = 2;
export const NARRATION_END_SCENE_INDEX = 7;
export const RULES_NARRATION_START_SCENE_INDEX = 9;
export const FINAL_SCENE_INDEX = SCENES.length - 1;
