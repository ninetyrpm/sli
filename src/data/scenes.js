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

export const SCENES = [
  {
    key: 'loading',
    type: 'loading',
    duration: 2600,
    lines: ['TUNING THE SIGNAL'],
  },
  {
    key: 'summons',
    type: 'text',
    duration: 4300,
    tone: 'whisper',
    lines: ['The Loop beckons once more...'],
  },
  {
    key: 'flicker-one',
    type: 'blackout',
    duration: 1150,
    lines: [],
  },
  {
    key: 'doctrine',
    type: 'text',
    duration: 7200,
    tone: 'doctrine',
    lines: ['Pain cleanses.', 'Distance redeems.', 'Through suffering,', 'We become one.'],
  },
  {
    key: 'flicker-two',
    type: 'blackout',
    duration: 1150,
    lines: [],
  },
  {
    key: 'rules',
    type: 'text',
    duration: 6200,
    tone: 'rule',
    lines: ['No prizes.', 'No podiums.', 'Just insanity.'],
  },
  {
    key: 'flicker-three',
    type: 'blackout',
    duration: 1100,
    lines: [],
  },
  {
    key: 'closing',
    type: 'final',
    duration: null,
    tone: 'closing',
    lines: ['The Third Rite approaches.', 'Will you join the madness?'],
  },
];

export const LOADING_SCENE_INDEX = 0;
export const FINAL_SCENE_INDEX = SCENES.length - 1;
