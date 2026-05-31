export type DayKey = 'SAT' | 'SUN' | 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI';

export interface Exercise {
  number: string;
  name: string;
  sets: string;
  rir?: string;
  rest?: string;
  notes?: string;
  alt?: string[];
}

export interface WorkoutSection {
  title: string;
  totalSets: string;
  exercises: Exercise[];
}

export interface WarmUp {
  name: string;
  sets: string;
}

export const workoutData: Record<DayKey, {
  title: string;
  warmUp?: WarmUp[];
  sections: WorkoutSection[];
  core?: { name: string; sets: string }[];
  isRest?: boolean;
}> = {
  SAT: {
    title: 'Chest (Push Heavy)',
    warmUp: [
      { name: 'Band Pull-Apart', sets: '2x15' },
      { name: 'Arm Circle + CARs', sets: '2min' },
      { name: 'Light Cable Fly', sets: '2x15' },
    ],
    sections: [
      {
        title: 'Chest, Tricep & Side Delt',
        totalSets: 'Chest: ~11-13 sets | Tricep: ~9 sets | Side Delt: ~3 sets',
        exercises: [
          { number: '01', name: 'Incline Smith Press', sets: '3-4x8-10', rir: 'Auto regulate stamina | RIR 2 sets 1-2/3, RIR 1 last set', rest: '2-3min', notes: 'Upper chest, load tension | Control negative 2-3sec | Full stretch at bottom', alt: ['Incline DB Press', 'Incline Machine Press'] },
          { number: '02', name: 'Chest Press Machine', sets: '3-4x10-12', rir: 'Auto regulate stamina | RIR 2 sets 1-2/3, RIR 1 last set', rest: '90sec-2min', notes: 'Mid chest, load tension | Squeeze at top | Adjust seat = handles mid chest', alt: ['Flat DB Press', 'Flat Smith Press'] },
          { number: '03', name: 'Cable Fly Low-to-High', sets: '3x12-15', rir: 'RIR 1-2 all sets', rest: '60-90sec', notes: 'Upper chest constant tension | Slight elbow bend fixed | Squeeze at top', alt: ['Incline DB Fly', 'Pec Deck adjusted angle'] },
          { number: '04', name: 'JM Press', sets: '3x10-12', rir: 'RIR 2 sets 1-2, RIR 1 last set', rest: '90sec', notes: 'Tricep load tension | Bar to lower chest/upper abs | Elbows slightly flared', alt: ['Close Grip Smith Press', 'EZ Bar JM Press'] },
          { number: '05', name: 'Dips', sets: '3x8-12', rir: 'Bodyweight controlled', rest: '90sec', notes: 'Tricep stretch tension | Lean forward = more chest | Upright = more tricep | No shrugging at bottom', alt: ['Assisted Dips Machine', 'Cable Pushdown'] },
          { number: '06', name: 'Tricep Pushdown V-bar', sets: '3x12-15', rir: 'RIR 1-2 all sets', rest: '60sec', notes: 'Tricep constant tension | Lateral head pump | Elbows pinned to sides', alt: ['Rope Pushdown', 'Single Arm Pushdown'] },
          { number: '07', name: 'Cable Lateral Raise', sets: '3x15-20', rir: 'RIR 1-2 all sets', rest: '60sec', notes: 'Side delt finisher | Light weight strict form | Avoid shoulder fatigue = last ✅', alt: ['DB Lateral Raise', 'Band Lateral Raise'] },
        ],
      },
    ],
  },
  SUN: {
    title: 'Pull (Back Width)',
    warmUp: [
      { name: 'Dead Hang', sets: '2x20-30sec' },
      { name: 'Band Pull-Apart', sets: '2x15' },
      { name: 'Light Lat Pulldown', sets: '2x15' },
    ],
    sections: [
      {
        title: 'Lats, Upper Back, Bicep & Rear Delt',
        totalSets: 'Total: 25 sets | Lats: ~13 sets | Upper Back: ~3 sets | Bicep: ~6 sets | Rear Delt: ~3 sets',
        exercises: [
          { number: '01', name: 'Plate Loaded Lat Pulldown', sets: '4x8-10', rir: 'Supinated grip, HEAVY | RIR 2 sets 1-3, RIR 1 last set', rest: '2-3min', notes: 'Primary width movement | Full stretch at top | Slow negative 3sec | Pull to upper chest', alt: ['Wide Grip Cable Pulldown', 'Wide Grip Assisted Pull-up'] },
          { number: '02', name: 'Chest Supported Low Row', sets: '3x10-12', rir: 'Underhand grip | RIR 2 sets 1-2, RIR 1 last set', rest: '2min', notes: 'Lower lat focus | Pull to lower abdomen | Full stretch at front', alt: ['Underhand Lat Pulldown', 'Machine Low Row strict'] },
          { number: '03', name: 'Chest Supported Upper Row', sets: '3x10-12', rir: 'Overhand, elbows flared | RIR 2 sets 1-2, RIR 1 last set', rest: '2min', notes: 'Upper back + rear delt | Elbows flared 45-60° | Squeeze shoulder blades', alt: ['Incline DB Row', 'Seated Cable Row flared'] },
          { number: '04', name: 'DB Incline Curl', sets: '3x10-12', rir: 'Supinated | RIR 2 sets 1-2, RIR 1 last set', rest: '90sec', notes: 'Bicep stretch tension | Arms pre exhausted ✅ | Full stretch at bottom | Slow negative 3sec', alt: ['Low Cable Curl incline', 'Incline Cable Curl'] },
          { number: '05', name: 'Wide Grip Lat Pulldown', sets: '3x12-15', rir: 'Cable, lighter | RIR 1-2 all sets', rest: '90sec', notes: 'Upper lat pump finisher | Squeeze lats at bottom | Full stretch at top', alt: ['Wide Grip Assisted Pull-up', 'Straight Arm Pulldown'] },
          { number: '06', name: 'Close Grip Lat Pulldown', sets: '3x12-15', rir: 'Cable | RIR 1-2 all sets', rest: '90sec', notes: 'Lower lat pump finisher | Constant tension ✅ | Full stretch at top', alt: ['Neutral Grip Pulldown', 'Supinated Grip Pulldown'] },
          { number: '07', name: 'Hammer Cable Curl', sets: '3x12-15', rir: 'Rope attachment | RIR 1-2 all sets', rest: '60sec', notes: 'Brachialis pump finisher | Neutral grip strict | Constant tension ✅', alt: ['DB Hammer Curl', 'Cross Body Hammer Curl'] },
          { number: '08', name: 'Unilateral Cable Rear Delt', sets: '3x15', rir: 'Light, strict', rest: '60sec', notes: 'Always last ✅ | Squeeze rear delt not trap | Elbow slightly bent fixed', alt: ['Pec Deck Reverse', 'DB Rear Delt Fly'] },
        ],
      },
    ],
  },
  MON: {
    title: 'Legs (Maintenance)',
    warmUp: [
      { name: 'Hip Flexor Stretch', sets: '2x60sec each side' },
      { name: 'Glute Bridge', sets: '2x15' },
      { name: 'Bodyweight Squat', sets: '2x10' },
    ],
    sections: [
      {
        title: 'Legs & Core',
        totalSets: 'Quad: ~10 sets | Hamstring: ~3 sets | Calf: ~3 sets | Core: ✅ | Lower Back: ✅',
        exercises: [
          { number: '01', name: 'Leg Press', sets: '4x10-12', rir: 'RIR 2 sets 1-3, RIR 1 last set', rest: '2min', notes: 'Primary quad compound | Feet shoulder width | Don\'t lock knees at top | Full range of motion', alt: ['Hack Squat Machine', 'Smith Machine Squat'] },
          { number: '02', name: 'V-Squat Machine', sets: '3x10-12', rir: 'RIR 2 sets 1-2, RIR 1 last set', rest: '2min', notes: 'Quad detail focus | Back against pad always ✅ | Core braced throughout | Knees track over toes | Depth = parallel minimum | Post-PLDD safe ✅✅', alt: ['Smith Machine Goblet Squat', 'Hack Squat Machine'] },
          { number: '03', name: 'Leg Extension', sets: '3x15', rir: 'RIR 1-2 all sets', rest: '90sec', notes: 'Quad isolation | Squeeze at top | Slow negative 2-3sec', alt: ['Cable Leg Extension'] },
          { number: '04', name: 'Hamstring Curl', sets: '3x12', rir: 'RIR 1-2 all sets', rest: '90sec', notes: 'Hamstring isolation | Full stretch at bottom | Slow negative 2-3sec', alt: ['Romanian Deadlift LIGHT', 'Cable Pull Through'] },
          { number: '05', name: 'Calf Raise', sets: '3x15', rir: 'RIR 1-2 all sets', rest: '60sec', notes: 'Full stretch at bottom | Pause at top 1sec | Don\'t bounce', alt: ['Seated Calf Raise', 'Smith Machine Calf Raise'] },
          { number: '06', name: 'Dead Bug', sets: '3x10', rest: '60sec', notes: 'Core stability first ✅ | Lower back flat on floor | Breathe out on extension | Non negotiable post-PLDD', alt: ['Bird Dog', 'Pallof Press'] },
          { number: '07', name: 'Partial Back Extension', sets: '3x12-15', rir: 'Slow tempo 3-4sec | Bodyweight only', rest: '60sec', notes: 'Lower back training ✅ | Partial ROM only | NEVER hyperextend at top ⚠️ | Neutral spine always ✅ | 1sec hold at top | Post-PLDD approved ✅', alt: ['Superman Hold', 'Cable Pull Through light'] },
        ],
      },
    ],
  },
  TUE: {
    title: 'Shoulders + Upper Chest',
    warmUp: [
      { name: 'Band Pull-Apart', sets: '2x15' },
      { name: 'Wall Angels', sets: '2x10' },
      { name: 'Light Lateral Raise', sets: '2x15' },
    ],
    sections: [
      {
        title: 'Shoulders, Upper Chest & Rear Delt',
        totalSets: 'Shoulders: ~10 sets | Upper Chest: ~3 sets | Mid Chest: ~3 sets | Rear Delt: ~3 sets',
        exercises: [
          { number: '01', name: 'Smith Machine OHP', sets: '4x10-12', rir: 'RIR 2 sets 1-3, RIR 1 last set', rest: '2-3min', notes: 'Primary shoulder compound | Core braced, no lumbar arch | Don\'t lock out at top | Control negative 2-3sec', alt: ['DB Shoulder Press', 'Plate Loaded OHP Machine'] },
          { number: '02', name: 'Lateral Raise Machine', sets: '4x12-15', rir: 'RIR 2 sets 1-3, RIR 1 last set', rest: '90sec', notes: 'Side delt width, load tension | Don\'t shrug at top | Control negative 2-3sec | Elbows slightly bent fixed', alt: ['DB Lateral Raise', 'Cable Lateral Raise'] },
          { number: '03', name: 'Cable Fly Low-to-High', sets: '3x12-15', rir: 'RIR 1-2 all sets', rest: '90sec', notes: 'Upper chest priority ✅ | Weakness = train fresh ✅ | Slight elbow bend fixed | Squeeze at top | Minimal front delt ✅', alt: ['Incline DB Fly', 'Incline Cable Fly'] },
          { number: '04', name: 'Pec Deck Flat', sets: '3x12-15', rir: 'RIR 1-2 all sets', rest: '90sec', notes: 'Mid chest load tension | Full stretch at sides | Squeeze at peak | Control negative 2-3sec | Minimal front delt ✅', alt: ['Cable Fly Horizontal', 'DB Fly Flat'] },
          { number: '05', name: 'Cable Lateral Raise', sets: '3x15-20', rir: 'RIR 1-2 all sets', rest: '60sec', notes: 'Side delt finisher | Constant tension pump ✅ | Light weight strict form | Control throughout', alt: ['DB Lateral Raise', 'Band Lateral Raise'] },
          { number: '06', name: 'Unilateral Cable Rear Delt', sets: '3x15', rir: 'Rear Delt | Light, strict', rest: '60sec', notes: 'ALWAYS LAST ✅ | Rear delt cooldown | Posture reset ✅ | Squeeze rear delt not trap | Elbow slightly bent fixed', alt: ['Pec Deck Reverse', 'DB Rear Delt Fly Incline'] },
        ],
      },
    ],
  },
  WED: {
    title: 'Back Thickness',
    warmUp: [
      { name: 'Band Pull-Apart', sets: '2x15' },
      { name: 'Dead Hang', sets: '2x20-30sec' },
      { name: 'Light Cable Row', sets: '2x15' },
    ],
    sections: [
      {
        title: 'Back & Rear Delt',
        totalSets: 'Back: ~16 sets | Rear Delt: ~3 sets',
        exercises: [
          { number: '01', name: 'Chest Supported Row Upper', sets: '4x8-10', rir: 'Overhand, elbows flared | HEAVY | RIR 2 sets 1-3, RIR 1 last set', rest: '2-3min', notes: 'Primary compound, load tension | Elbows flared 45-60° | Squeeze shoulder blades peak | Full stretch at front | Slow negative 2-3sec', alt: ['Machine Row', 'Seated Cable Row flared'] },
          { number: '02', name: 'Plate Loaded Lat Pulldown Reverse', sets: '3x10-12', rir: 'Supinated grip | RIR 2 sets 1-2, RIR 1 last set', rest: '2min', notes: 'Vertical pull, lower lat | Different vector than row ✅ | Supinated = stronger position | Pull to upper chest | Full stretch at top', alt: ['Underhand Cable Pulldown', 'Supinated Assisted Pull-up'] },
          { number: '03', name: 'Chest Supported Row Underhand', sets: '3x10-12', rir: 'Supinated grip | RIR 2 sets 1-2, RIR 1 last set', rest: '2min', notes: 'Lower lat focus | Horizontal pull ✅ | Pull to lower abdomen | Full stretch at front', alt: ['Machine Row Low Grip', 'DB Row chest supported'] },
          { number: '04', name: 'Wide Grip Lat Pulldown', sets: '3x8-10', rir: 'Assisted if needed', rest: '2min', notes: 'Stretch tension | Dead hang at bottom ← key | Wide grip strict form | No kipping', alt: ['Assisted Pull-up Machine', 'Cable Lat Pulldown Wide lighter'] },
          { number: '05', name: 'Close Grip Lat Pulldown', sets: '3x12-15', rir: 'RIR 1-2 all sets', rest: '90sec', notes: 'Constant tension pump | Full stretch at top | Squeeze lats at bottom', alt: ['Neutral Grip Pulldown', 'Supinated Grip Pulldown'] },
          { number: '06', name: 'Unilateral Cable Rear Delt', sets: '3x15', rir: 'Rear Delt | Light, strict', rest: '60sec', notes: 'ALWAYS LAST ✅ | Rear delt cooldown | Posture reset ✅ | Squeeze rear delt not trap', alt: ['Pec Deck Reverse', 'DB Rear Delt Fly'] },
        ],
      },
    ],
  },
  THU: {
    title: 'Arms + Core',
    warmUp: [
      { name: 'Light Tricep Pushdown', sets: '2x15' },
      { name: 'Light Cable Curl', sets: '2x15' },
    ],
    sections: [
      {
        title: 'Tricep & Bicep',
        totalSets: 'Tricep: ~11 sets | Bicep: ~13 sets | Core: ✅',
        exercises: [
          { number: '01', name: 'Close Grip Smith Press', sets: '4x8-10', rir: 'HEAVY', rest: '2min', notes: 'Tricep compound, load tension', alt: ['Close Grip Bench Press', 'Tricep Dips (weighted)'] },
          { number: '02', name: 'Incline DB Curl', sets: '4x10-12', rir: 'Supinated, HEAVY', rest: '90sec', notes: 'Bicep stretch tension', alt: ['Cable Curl (low pulley)', 'Incline Cable Curl'] },
          { number: '03', name: 'Hammer Incline DB Curl', sets: '3x12', rir: 'Neutral grip, same bench', rest: '60sec', notes: 'Brachialis stretch tension', alt: ['Incline Cable Hammer Curl', 'Incline Alternating Hammer Curl'] },
          { number: '04', name: 'Tricep Pushdown V-bar', sets: '3x12-15', rest: '60sec', notes: 'Lateral head constant tension', alt: ['Rope Pushdown', 'Single Arm Cable Pushdown'] },
          { number: '05', name: 'Overhead V-bar Extension', sets: '4x12-15', rest: '90sec', notes: 'Long head stretch tension (Facing away from cable)', alt: ['DB Overhead Extension', 'EZ Bar Overhead Extension'] },
          { number: '06', name: 'Cable Curl', sets: '3x12-15', rir: 'Supinated', rest: '60sec', notes: 'Bicep peak finisher', alt: ['Machine Curl', 'Preacher Cable Curl'] },
          { number: '07', name: 'Hammer Cable Curl', sets: '3x12-15', rir: 'Rope attachment', rest: '60sec', notes: 'Brachialis finisher', alt: ['DB Hammer Curl', 'Cross Body Hammer Curl'] },
          { number: '08', name: 'Cable Lateral Raise', sets: '3x15-20', rir: 'RIR 1-2 all sets', rest: '60sec', notes: 'Side delt finisher | Light weight strict form | Avoid shoulder fatigue = last ✅', alt: ['DB Lateral Raise', 'Band Lateral Raise'] },

        ],
      },
    ],
    core: [
      { name: 'Bird Dog', sets: '3x8 each side' },
      { name: 'Dead Bug', sets: '3x10' },
      { name: 'Side Plank', sets: '3x20-30sec' },
    ],
  },
  FRI: {
    title: 'Rest & Recovery',
    isRest: true,
    sections: [],
  },
};


export const workoutData5x: Record<DayKey, {
  title: string;
  warmUp?: WarmUp[];
  sections: WorkoutSection[];
  core?: { name: string; sets: string }[];
  isRest?: boolean;
}> = {
  SAT: {
    title: 'Push Heavy (Chest + Tricep)',
    warmUp: [
      { name: 'Band Pull-Apart', sets: '2x15' },
      { name: 'Arm Circle + CARs', sets: '2min' },
      { name: 'Light Cable Fly', sets: '2x15' },
      { name: 'Band External Rotation', sets: '2x15' },
    ],
    sections: [
      {
        title: 'Chest & Tricep',
        totalSets: 'Chest: ~11-13 sets | Tricep: ~6 sets | Side Delt: ~3 sets',
        exercises: [
          {
            number: '01',
            name: 'Incline Smith Press',
            sets: '3-4x8-10',
            rir: 'Auto regulate stamina | RIR 2 sets 1-2/3, RIR 1 last set',
            rest: '2-3min',
            notes: 'Upper chest, load tension | Control negative 2-3sec | Full stretch at bottom',
            alt: ['Incline DB Press', 'Incline Machine Press'],
          },
          {
            number: '02',
            name: 'Chest Press Machine',
            sets: '3-4x10-12',
            rir: 'Auto regulate stamina | RIR 2 sets 1-2/3, RIR 1 last set',
            rest: '90sec-2min',
            notes: 'Mid chest, load tension | Squeeze at top | Adjust seat = handles mid chest',
            alt: ['Flat DB Press', 'Flat Smith Press'],
          },
          {
            number: '03',
            name: 'Cable Fly Low-to-High',
            sets: '3x12-15',
            rir: 'RIR 1-2 all sets',
            rest: '60-90sec',
            notes: 'Upper chest constant tension | Slight elbow bend fixed | Squeeze at top',
            alt: ['Incline DB Fly', 'Pec Deck adjusted angle'],
          },
          {
            number: '04',
            name: 'Dips',
            sets: '3x8-12',
            rir: 'Bodyweight controlled',
            rest: '90sec',
            notes: 'Tricep stretch tension | Lean forward = more chest | Upright = more tricep | No shrugging at bottom',
            alt: ['Assisted Dips Machine', 'Cable Pushdown'],
          },
          {
            number: '05',
            name: 'Tricep Pushdown V-bar',
            sets: '3x12-15',
            rir: 'RIR 1-2 all sets',
            rest: '60sec',
            notes: 'Tricep constant tension | Lateral head pump | Elbows pinned to sides',
            alt: ['Rope Pushdown', 'Single Arm Pushdown'],
          },
          {
            number: '06',
            name: 'Cable Lateral Raise',
            sets: '3x15-20',
            rir: 'RIR 1-2 all sets',
            rest: '60sec',
            notes: 'Side delt finisher | Light weight strict form | Avoid shoulder fatigue = last ✅',
            alt: ['DB Lateral Raise', 'Band Lateral Raise'],
          },
        ],
      },
    ],
  },

  SUN: {
    title: 'Pull Heavy (Back Width + Bicep)',
    warmUp: [
      { name: 'Dead Hang', sets: '2x20-30sec' },
      { name: 'Band Pull-Apart', sets: '2x15' },
      { name: 'Light Lat Pulldown', sets: '2x15' },
    ],
    sections: [
      {
        title: 'Lats, Upper Back, Bicep & Rear Delt',
        totalSets: 'Lats: ~13 sets | Upper Back: ~3 sets | Bicep: ~6 sets | Rear Delt: ~3 sets',
        exercises: [
          {
            number: '01',
            name: 'Plate Loaded Lat Pulldown',
            sets: '4x8-10',
            rir: 'Wide grip, HEAVY | RIR 2 sets 1-3, RIR 1 last set',
            rest: '2-3min',
            notes: 'Primary width movement | Full stretch at top | Slow negative 3sec | Pull to upper chest',
            alt: ['Wide Grip Cable Pulldown', 'Wide Grip Assisted Pull-up'],
          },
          {
            number: '02',
            name: 'Chest Supported Low Row',
            sets: '3x10-12',
            rir: 'Underhand grip | RIR 2 sets 1-2, RIR 1 last set',
            rest: '2min',
            notes: 'Lower lat focus | Pull to lower abdomen | Full stretch at front',
            alt: ['Underhand Lat Pulldown', 'Machine Low Row strict'],
          },
          {
            number: '03',
            name: 'Chest Supported Upper Row',
            sets: '3x10-12',
            rir: 'Overhand, elbows flared | RIR 2 sets 1-2, RIR 1 last set',
            rest: '2min',
            notes: 'Upper back + rear delt | Elbows flared 45-60° | Squeeze shoulder blades',
            alt: ['Incline DB Row', 'Seated Cable Row flared'],
          },
          {
            number: '04',
            name: 'DB Incline Curl',
            sets: '3x10-12',
            rir: 'Supinated | RIR 2 sets 1-2, RIR 1 last set',
            rest: '90sec',
            notes: 'Bicep PRIMARY stretch tension | Arms pre exhausted ✅ | Full stretch at bottom | Slow negative 3sec',
            alt: ['Low Cable Curl incline', 'Incline Cable Curl'],
          },
          {
            number: '05',
            name: 'Wide Grip Lat Pulldown',
            sets: '3x12-15',
            rir: 'Cable, lighter | RIR 1-2 all sets',
            rest: '90sec',
            notes: 'Upper lat pump finisher | Squeeze lats at bottom | Full stretch at top',
            alt: ['Wide Grip Assisted Pull-up', 'Straight Arm Pulldown'],
          },
          {
            number: '06',
            name: 'Close Grip Lat Pulldown',
            sets: '3x12-15',
            rir: 'Cable | RIR 1-2 all sets',
            rest: '90sec',
            notes: 'Lower lat pump finisher | Constant tension ✅ | Full stretch at top',
            alt: ['Neutral Grip Pulldown', 'Supinated Grip Pulldown'],
          },
          {
            number: '07',
            name: 'Hammer Cable Curl',
            sets: '3x12-15',
            rir: 'Rope attachment | RIR 1-2 all sets',
            rest: '60sec',
            notes: 'Brachialis pump finisher | Neutral grip strict | Constant tension ✅',
            alt: ['DB Hammer Curl', 'Cross Body Hammer Curl'],
          },
          {
            number: '08',
            name: 'Unilateral Cable Rear Delt',
            sets: '3x15',
            rir: 'Light, strict',
            rest: '60sec',
            notes: 'ALWAYS LAST ✅ | Squeeze rear delt not trap | Elbow slightly bent fixed',
            alt: ['Pec Deck Reverse', 'DB Rear Delt Fly'],
          },
        ],
      },
    ],
  },

  MON: {
    title: 'Legs (Maintenance + Core)',
    warmUp: [
      { name: 'Hip Flexor Stretch', sets: '2x60sec each side' },
      { name: 'Glute Bridge', sets: '2x15' },
      { name: 'Bodyweight Squat', sets: '2x10' },
    ],
    sections: [
      {
        title: 'Legs & Core',
        totalSets: 'Quad: ~8 sets | Adductor: ~2 sets | Hamstring: ~2 sets | Calf: ~3 sets | Core: ✅ | Lower Back: ✅',
        exercises: [
          {
            number: '01',
            name: 'Leg Press Standard',
            sets: '3x12',
            rir: 'RIR 2-3 all sets | 70-75% max | NOT to failure',
            rest: '2min',
            notes: 'Overall quad mass | Feet shoulder width | Eccentric 3sec | Don\'t lock knees at top | Control throughout',
            alt: ['Smith Machine Squat', 'Hack Squat Machine'],
          },
          {
            number: '02',
            name: 'Leg Press Narrow Low',
            sets: '3x12',
            rir: 'RIR 2-3 all sets | Lighter than standard | NOT to failure',
            rest: '2min',
            notes: 'VL outer sweep + VMO detail ✅ | Narrow feet + low platform | Eccentric 3sec controlled | Don\'t lock knees',
            alt: ['Hack Squat Machine', 'Smith Machine Goblet Squat'],
          },
          {
            number: '03',
            name: 'Leg Press Wide Sumo',
            sets: '2x15',
            rir: 'RIR 2 all sets | LIGHT weight | NOT to failure',
            rest: '90sec',
            notes: 'Adductor + VMO focus ✅ | Wide stance on same machine ✅ | Moderate speed | Less DOMS = same machine ✅ | Toes out 45°',
            alt: ['Hip Adductor Machine', 'Sumo Goblet Squat'],
          },
          {
            number: '04',
            name: 'Leg Extension',
            sets: '3x15',
            rir: 'RIR 1-2 all sets',
            rest: '90sec',
            notes: 'VMO isolation ✅✅ | Lowest DOMS risk ✅✅ | Squeeze at top | Slow negative 2-3sec | Week A: toes out (VMO) | Week B: toes in (VL)',
            alt: ['Cable Leg Extension'],
          },
          {
            number: '05',
            name: 'Hamstring Curl',
            sets: '2x12',
            rir: 'RIR 2 all sets | Maintenance only',
            rest: '90sec',
            notes: 'Maintenance only ✅ | Full stretch at bottom controlled | Slow negative 2-3sec | NOT to failure',
            alt: ['Romanian Deadlift LIGHT', 'Cable Pull Through'],
          },
          {
            number: '06',
            name: 'Calf Raise',
            sets: '3x15',
            rir: 'RIR 1-2 all sets',
            rest: '60sec',
            notes: 'Full stretch at bottom ✅ | Pause at top 1sec | Don\'t bounce | Controlled throughout',
            alt: ['Seated Calf Raise', 'Smith Machine Calf Raise'],
          },
          {
            number: '07',
            name: 'Dead Bug',
            sets: '3x10',
            rest: '60sec',
            notes: 'Core stability ✅ | Lower back flat on floor | Breathe out on extension | Non negotiable post-PLDD',
            alt: ['Bird Dog', 'Pallof Press'],
          },
          {
            number: '08',
            name: 'Partial Back Extension',
            sets: '3x12-15',
            rir: 'Slow tempo 3-4sec | Bodyweight only',
            rest: '60sec',
            notes: 'Lower back training ✅ | Partial ROM only | NEVER hyperextend ⚠️ | Neutral spine always ✅ | 1sec hold at top | Post-PLDD approved ✅',
            alt: ['Superman Hold', 'Cable Pull Through light'],
          },
        ],
      },
    ],
  },

  TUE: {
    title: 'Shoulders + Tricep + Light Bicep',
    warmUp: [
      { name: 'Band Pull-Apart', sets: '2x15' },
      { name: 'Wall Angels', sets: '2x10' },
      { name: 'Light Lateral Raise', sets: '2x15' },
      { name: 'Band External Rotation', sets: '2x15' },
    ],
    sections: [
      {
        title: 'Shoulders',
        totalSets: 'Shoulders: ~10 sets | Rear Delt: ~3 sets',
        exercises: [
          {
            number: '01',
            name: 'Smith Machine OHP',
            sets: '4x10-12',
            rir: 'RIR 2 sets 1-3, RIR 1 last set',
            rest: '2-3min',
            notes: 'Primary shoulder compound | Core braced, no lumbar arch | Don\'t lock out at top | Control negative 2-3sec',
            alt: ['DB Shoulder Press', 'Plate Loaded OHP Machine'],
          },
          {
            number: '02',
            name: 'Lateral Raise Machine',
            sets: '4x12-15',
            rir: 'RIR 2 sets 1-3, RIR 1 last set',
            rest: '90sec',
            notes: 'Side delt width, load tension | Don\'t shrug at top | Control negative 2-3sec',
            alt: ['DB Lateral Raise', 'Cable Lateral Raise'],
          },
          {
            number: '03',
            name: 'Cable Lateral Raise',
            sets: '3x15-20',
            rir: 'RIR 1-2 all sets',
            rest: '60sec',
            notes: 'Side delt constant tension pump | Light weight strict form',
            alt: ['DB Lateral Raise', 'Band Lateral Raise'],
          },
        ],
      },
      {
        title: 'Tricep',
        totalSets: 'Tricep: ~9 sets',
        exercises: [
          {
            number: '04',
            name: 'Close Grip Smith Press',
            sets: '4x8-10',
            rir: 'HEAVY | RIR 2 sets 1-3, RIR 1 last set',
            rest: '2min',
            notes: 'Tricep compound, load tension | After OHP = acceptable pre-fatigue ✅ | Elbows tucked not flared | Slow negative 2-3sec',
            alt: ['Close Grip Bench Press', 'Weighted Tricep Dips'],
          },
          {
            number: '05',
            name: 'Overhead V-bar Extension',
            sets: '4x12-15',
            rir: 'Facing away from cable | RIR 2 sets 1-3, RIR 1 last set',
            rest: '90sec',
            notes: 'Long head stretch tension | Elbows close to head fixed | Full stretch at bottom',
            alt: ['DB Overhead Extension', 'EZ Bar Overhead Extension'],
          },
          {
            number: '06',
            name: 'Tricep Pushdown V-bar',
            sets: '3x12-15',
            rir: 'RIR 1-2 all sets',
            rest: '60sec',
            notes: 'Lateral head constant tension | Elbows pinned to sides | Full extension at bottom',
            alt: ['Rope Pushdown', 'Single Arm Cable Pushdown'],
          },
        ],
      },
      {
        title: 'Light Bicep',
        totalSets: 'Bicep: ~3 sets (pump only)',
        exercises: [
          {
            number: '07',
            name: 'Cable Curl',
            sets: '3x15-20',
            rir: 'LIGHT | RIR 1-2 all sets',
            rest: '60sec',
            notes: 'Light frequency only ✅ | Constant tension pump | Supinate at top pinky up | NOT to failure',
            alt: ['Machine Curl', 'Preacher Cable Curl'],
          },
          {
            number: '08',
            name: 'Unilateral Cable Rear Delt',
            sets: '3x15',
            rir: 'Light, strict',
            rest: '60sec',
            notes: 'ALWAYS LAST ✅ | Rear delt cooldown | Posture reset ✅ | Squeeze rear delt not trap',
            alt: ['Pec Deck Reverse', 'DB Rear Delt Fly Incline'],
          },
        ],
      },
    ],
  },

  WED: {
    title: 'Rest & Recovery',
    isRest: true,
    sections: [],
  },

  THU: {
    title: 'Upper Frequency (Back + Chest + Bicep)',
    warmUp: [
      { name: 'Dead Hang', sets: '2x20-30sec' },
      { name: 'Band Pull-Apart', sets: '2x15' },
      { name: 'Light Cable Row', sets: '2x15' },
    ],
    sections: [
      {
        title: 'Back (Overhand Only)',
        totalSets: 'Back: ~9 sets',
        exercises: [
          {
            number: '01',
            name: 'Chest Supported Row Upper',
            sets: '4x8-10',
            rir: 'Overhand, elbows flared | HEAVY | RIR 2 sets 1-3, RIR 1 last set',
            rest: '2-3min',
            notes: 'Primary compound | Overhand = minimal bicep ✅ | Elbows flared 45-60° | Squeeze shoulder blades | Full stretch at front',
            alt: ['Machine Row', 'Seated Cable Row flared'],
          },
          {
            number: '02',
            name: 'Plate Loaded Lat Pulldown Reverse',
            sets: '3x10-12',
            rir: 'Supinated grip | RIR 2 sets 1-2, RIR 1 last set',
            rest: '2min',
            notes: 'Width frequency ✅ | Supinated = stronger position | Pull to upper chest | Full stretch at top',
            alt: ['Underhand Cable Pulldown', 'Supinated Assisted Pull-up'],
          },
          {
            number: '03',
            name: 'Close Grip Lat Pulldown',
            sets: '3x12-15',
            rir: 'RIR 1-2 all sets',
            rest: '90sec',
            notes: 'Constant tension pump | Full stretch at top | Squeeze lats at bottom',
            alt: ['Neutral Grip Pulldown', 'Supinated Grip Pulldown'],
          },
        ],
      },
      {
        title: 'Chest Fly (Frequency)',
        totalSets: 'Chest: ~6 sets',
        exercises: [
          {
            number: '04',
            name: 'Cable Fly Low-to-High',
            sets: '3x12-15',
            rir: 'RIR 1-2 all sets',
            rest: '90sec',
            notes: 'Upper chest frequency ✅ | Minimal front delt ✅ | Slight elbow bend fixed | Squeeze at top',
            alt: ['Incline DB Fly', 'Incline Cable Fly'],
          },
          {
            number: '05',
            name: 'Pec Deck Flat',
            sets: '3x12-15',
            rir: 'RIR 1-2 all sets',
            rest: '90sec',
            notes: 'Mid chest frequency ✅ | Minimal front delt ✅ | Full stretch at sides | Squeeze at peak',
            alt: ['Cable Fly Horizontal', 'DB Fly Flat'],
          },
        ],
      },
      {
        title: 'Bicep (Heavy)',
        totalSets: 'Bicep: ~9 sets',
        exercises: [
          {
            number: '06',
            name: 'Incline DB Curl',
            sets: '4x10-12',
            rir: 'Supinated, HEAVY | RIR 2 sets 1-3, RIR 1 last set',
            rest: '90sec',
            notes: 'PRIMARY bicep stretch tension | Heavy day ✅ | Full stretch at bottom | Slow negative 3sec',
            alt: ['Low Cable Curl incline', 'Incline Cable Curl'],
          },
          {
            number: '07',
            name: 'Hammer Incline DB Curl',
            sets: '3x12',
            rir: 'Neutral grip, same bench | RIR 1-2 all sets',
            rest: '90sec',
            notes: 'Brachialis stretch tension | Just rotate grip ✅ | Full stretch at bottom',
            alt: ['Cable Rope Hammer Curl', 'Cross Body Hammer Curl'],
          },
          {
            number: '08',
            name: 'Hammer Cable Curl',
            sets: '3x12-15',
            rir: 'Rope attachment | RIR 1-2 all sets',
            rest: '60sec',
            notes: 'Brachialis constant tension finisher | Neutral grip strict',
            alt: ['DB Hammer Curl', 'Cross Body Hammer Curl'],
          },
        ],
      },
      {
        title: 'Lateral + Rear Delt',
        totalSets: 'Side Delt: ~3 sets | Rear Delt: ~3 sets',
        exercises: [
          {
            number: '09',
            name: 'Cable Lateral Raise',
            sets: '3x15-20',
            rir: 'RIR 1-2 all sets',
            rest: '60sec',
            notes: 'Side delt frequency finisher | Light weight strict form | V-taper focus ✅',
            alt: ['DB Lateral Raise', 'Band Lateral Raise'],
          },
          {
            number: '10',
            name: 'Unilateral Cable Rear Delt',
            sets: '3x15',
            rir: 'Light, strict',
            rest: '60sec',
            notes: 'ALWAYS LAST ✅ | Rear delt cooldown | Posture reset ✅ | Squeeze rear delt not trap',
            alt: ['Pec Deck Reverse', 'DB Rear Delt Fly'],
          },
        ],
      },
    ],
    core: [
      { name: 'Bird Dog', sets: '3x8 each side' },
      { name: 'Dead Bug', sets: '3x10' },
      { name: 'Side Plank', sets: '3x20-30sec' },
    ],
  },

  FRI: {
    title: 'Rest & Recovery',
    isRest: true,
    sections: [],
  },
};