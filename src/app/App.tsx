import { useState } from 'react';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import HotelIcon from '@mui/icons-material/Hotel';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

type DayKey = 'SAT' | 'SUN' | 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI';

interface Exercise {
  number: string;
  name: string;
  sets: string;
  rir?: string;
  rest?: string;
  notes?: string;
  alt?: string[];
}

interface WorkoutSection {
  title: string;
  totalSets: string;
  exercises: Exercise[];
}

interface WarmUp {
  name: string;
  sets: string;
}

const workoutData: Record<DayKey, {
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
          { number: '01', name: 'Incline Smith Press', sets: '3-4x8-10', rir: 'Auto regulate stamina | HEAVY | RIR 2 sets 1-2/3, failure last set', rest: '2-3min', notes: 'Upper chest, load tension | Control negative 2-3sec | Full stretch at bottom', alt: ['Incline DB Press', 'Incline Machine Press'] },
          { number: '02', name: 'Chest Press Machine', sets: '3-4x10-12', rir: 'Auto regulate stamina | RIR 2 sets 1-2/3, failure last set', rest: '90sec-2min', notes: 'Mid chest, load tension | Squeeze at top | Adjust seat = handles mid chest', alt: ['Flat DB Press', 'Flat Smith Press'] },
          { number: '03', name: 'Cable Fly Low-to-High', sets: '3x12-15', rir: 'RIR 1-2 all sets', rest: '60-90sec', notes: 'Upper chest constant tension | Slight elbow bend fixed | Squeeze at top', alt: ['Incline DB Fly', 'Pec Deck adjusted angle'] },
          { number: '04', name: 'JM Press', sets: '3x10-12', rir: 'RIR 2 sets 1-2, failure set 3', rest: '90sec', notes: 'Tricep load tension | Bar to lower chest/upper abs | Elbows slightly flared', alt: ['Close Grip Smith Press', 'EZ Bar JM Press'] },
          { number: '05', name: 'Dips', sets: '3x8-12', rir: 'Bodyweight controlled', rest: '90sec', notes: 'Tricep stretch tension | Lean forward = more chest | Upright = more tricep | No shrugging at bottom', alt: ['Assisted Dips Machine', 'Cable Pushdown'] },
          { number: '06', name: 'Tricep Pushdown V-bar', sets: '3x12-15', rir: 'RIR 1-2 all sets', rest: '60sec', notes: 'Tricep constant tension | Lateral head pump | Elbows pinned to sides', alt: ['Rope Pushdown', 'Single Arm Pushdown'] },
          { number: '07', name: 'Cable Lateral Raise', sets: '3x15-20', rir: 'RIR 1-2 all sets', rest: '60sec', notes: 'Side delt finisher | Avoid shoulder fatigue = last ✅ | Light weight, strict form | Constant tension pump', alt: ['DB Lateral Raise', 'Band Lateral Raise'] },
        ],
      },
    ],
  },
  SUN: {
    title: 'Pull (Back Width)',
    warmUp: [
      { name: 'Band Pull-Apart', sets: '2x15' },
      { name: 'Dead Hang', sets: '2x20-30sec' },
      { name: 'Light Lat Pulldown', sets: '2x15' },
    ],
    sections: [
      {
        title: 'Lats, Upper Back, Bicep & Rear Delt',
        totalSets: 'Lats: ~14 sets | Upper Back: ~4 sets | Bicep: ~3 sets | Rear Delt: ~3 sets',
        exercises: [
          { number: '01', name: 'Lat Pulldown Machine', sets: '4x8-10', rir: 'Wide grip, HEAVY | RIR 2 sets 1-3, failure set 4', rest: '2-3min', notes: 'Primary width movement | Lean back slightly 15-20° | Pull to upper chest | Slow negative 3sec', alt: ['Wide Grip Assisted Pull-up', 'Wide Grip Cable Pulldown'] },
          { number: '02', name: 'Chest Supported Low Row', sets: '4x10-12', rir: 'Underhand/low grip | RIR 2 sets 1-3, failure set 4', rest: '90sec-2min', notes: 'Lower lat focus | Supinated = stronger position | Pull to lower abdomen | Full stretch at front', alt: ['Underhand Lat Pulldown', 'Machine Low Row (strict form)'] },
          { number: '03', name: 'High Bar Pull', sets: '3x8-10', rir: 'Assisted if needed', rest: '2min', notes: 'Stretch tension | Dead hang at bottom ← key | Wide grip | Strict form, no kipping', alt: ['Assisted Pull-up Machine', 'Wide Grip Lat Pulldown lighter'] },
          { number: '04', name: 'Chest Supported Upper Row', sets: '4x10-12', rir: 'Overhand, elbows flared | RIR 2 sets 1-3, failure set 4', rest: '90sec', notes: 'Upper back + rear delt | Elbows flared 45-60° | Squeeze shoulder blades peak | Full stretch at front', alt: ['Incline DB Row', 'Seated Cable Row elbows flared'] },
          { number: '05', name: 'Close Grip Pulldown', sets: '3x12-15', rir: 'Cable, constant tension | RIR 1-2 all sets', rest: '90sec', notes: 'Lat pump finisher | Full stretch at top | Squeeze lats at bottom', alt: ['Neutral Grip Pulldown', 'Supinated Grip Pulldown'] },
          { number: '06', name: 'Cable Curl', sets: '3x12-15', rir: 'Supinated | RIR 1-2 all sets', rest: '60sec', notes: 'Bicep pump finisher | Pre exhausted from pulling ✅ | Light weight still effective | Constant tension = maximum pump', alt: ['Machine Curl', 'DB Curl'] },
          { number: '07', name: 'Unilateral Cable Rear Delt', sets: '3x15', rest: '60sec', notes: 'Rear delt finisher | Always last ✅ | Horizontal pull | Squeeze rear delt not trap', alt: ['Pec Deck Reverse', 'DB Rear Delt Fly Incline'] },
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
        totalSets: 'Quad: ~10 sets | Hamstring: ~3 sets | Glute: ~3 sets | Calf: ~4 sets | Core: ✅',
        exercises: [
          { number: '01', name: 'Leg Press', sets: '4x12', rest: '2min', notes: 'Primary quad compound | Feet shoulder width | Don\'t lock knees at top', alt: ['Smith Machine Squat', 'Hack Squat Machine'] },
          { number: '02', name: 'Walking Lunges DB', sets: '3x12 each leg', rest: '90sec', notes: 'START BODYWEIGHT first | Glute + quad + hip flexor | Core braced THROUGHOUT | Lumbar neutral = non negotiable | Step length = moderate', alt: ['Reverse Lunges DB', 'Smith Machine Lunge'] },
          { number: '03', name: 'Leg Extension', sets: '3x15', rest: '90sec', notes: 'Quad isolation | Squeeze at top', alt: ['Cable Leg Extension'] },
          { number: '04', name: 'Hamstring Curl', sets: '3x12', rest: '90sec', notes: 'Hamstring isolation | Full stretch at bottom', alt: ['Romanian Deadlift LIGHT', 'Cable Pull Through'] },
          { number: '05', name: 'Calf Raise', sets: '4x15', rest: '60sec', notes: 'Full stretch at bottom | Pause at top', alt: ['Seated Calf Raise', 'Smith Machine Calf Raise'] },
          { number: '06', name: 'Dead Bug', sets: '3x10', rest: '60sec', notes: 'Core stability | Lower back FLAT on floor | Breathe out on extension', alt: ['Bird Dog', 'Pallof Press'] },
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
        totalSets: 'Shoulders: ~10 sets | Upper Chest: ~3 sets | Rear Delt: ~3 sets',
        exercises: [
          { number: '01', name: 'Smith Machine OHP', sets: '4x10-12', rir: 'RIR 2 sets 1-3, failure set 4', rest: '2-3min', notes: 'Primary shoulder compound', alt: ['DB Shoulder Press', 'Plate Loaded OHP Machine'] },
          { number: '02', name: 'Lateral Raise Machine', sets: '4x12-15', rir: 'RIR 2 sets 1-3, failure set 4', rest: '90sec', notes: 'Side delt width, load tension', alt: ['DB Lateral Raise', 'Cable Lateral Raise'] },
          { number: '03', name: 'Cable Lateral Raise', sets: '3x15-20', rir: 'RIR 1-2 all sets', rest: '60sec', notes: 'Side delt, constant tension', alt: ['DB Lateral Raise', 'Band Lateral Raise'] },
          { number: '04', name: 'Incline Machine Press', sets: '3x10-12', rir: 'RIR 2 sets 1-2, failure set 3', rest: '90sec', notes: 'Upper chest frequency', alt: ['Incline DB Press', 'Incline Smith Press (lighter)'] },
          { number: '05', name: 'Unilateral Cable Rear Delt', sets: '3x15', rest: '60sec', notes: 'Rear delt, posture', alt: ['Pec Deck Reverse', 'DB Rear Delt Fly'] },
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
        totalSets: 'Back: ~14 sets | Rear Delt: ~3 sets',
        exercises: [
          { number: '01', name: 'Chest Supported Row', sets: '4x8-10', rir: 'RIR 2 sets 1-3, failure set 4 (HEAVY)', rest: '2-3min', notes: 'Primary compound, load tension | Upper, elbows flared 45-60° | Squeeze shoulder blades peak', alt: ['Machine Row Low Grip', 'Seated Cable Row (elbows flared)'] },
          { number: '02', name: 'Chest Supported Row', sets: '4x10-12', rir: 'RIR 2 sets 1-3, failure set 4 (Moderate weight)', rest: '90sec', notes: 'Lower lat focus | Underhand grip = stronger position | Pull to lower chest/upper abs', alt: ['Machine Row Low Grip', 'DB Row (chest on incline bench)'] },
          { number: '03', name: 'High Bar Pull', sets: '3x8-10', rir: 'Assisted if needed', rest: '2min', notes: 'Stretch tension | Dead hang at bottom ← key | Wide grip', alt: ['Assisted Pull-up Machine', 'Wide Grip Lat Pulldown lighter'] },
          { number: '04', name: 'Close Grip Pulldown', sets: '3x12-15', rest: '90sec', notes: 'Constant tension pump | Full stretch at top | Squeeze lats at bottom', alt: ['Neutral Grip Pulldown', 'Supinated Grip Pulldown'] },
          { number: '05', name: 'Unilateral Cable Rear Delt', sets: '3x15', rest: '60sec', notes: 'Rear delt finisher | Horizontal pull | Squeeze rear delt not trap', alt: ['Pec Deck Reverse', 'DB Rear Delt Fly Incline'] },
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

export default function App() {
  const [selectedDay, setSelectedDay] = useState<DayKey>('THU');
  const days: DayKey[] = ['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI'];

  const currentWorkout = workoutData[selectedDay];
  const currentDayIndex = days.indexOf(selectedDay);

  const goToPrevDay = () => {
    if (currentDayIndex > 0) {
      setSelectedDay(days[currentDayIndex - 1]);
    }
  };

  const goToNextDay = () => {
    if (currentDayIndex < days.length - 1) {
      setSelectedDay(days[currentDayIndex + 1]);
    }
  };

  const isPrevDisabled = currentDayIndex === 0;
  const isNextDisabled = currentDayIndex === days.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 sm:px-6 sm:py-6">
          {/* Title - Centered */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-2">
              <FitnessCenterIcon className="text-blue-600" sx={{ fontSize: { xs: 24, sm: 28 } }} />
              <h1 className="text-lg sm:text-2xl font-bold text-slate-900 tracking-tight">
                PPL Upper Bias Hypertrophy Protocol
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">Ahmad Aji Santoso</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
        {/* Day Title */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center sm:text-left border-b-2 border-blue-600 pb-3 inline-block w-full">
            {selectedDay} — {currentWorkout.title}
          </h2>
        </div>

        {/* Rest Day */}
        {currentWorkout.isRest && (
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-200 overflow-hidden shadow-lg">
            <div className="p-8 sm:p-12 text-center">
              <div className="flex justify-center mb-6">
                <HotelIcon sx={{ fontSize: 72 }} className="text-purple-600" />
              </div>
              <h3 className="text-3xl sm:text-5xl font-bold text-slate-900 mb-4">
                Rest Day 🛌
              </h3>
              <p className="text-lg sm:text-xl text-slate-700 max-w-2xl mx-auto mb-8">
                Complete rest and recovery. Your body needs this time to rebuild and adapt.
              </p>
              <div className="bg-white/70 rounded-xl px-6 py-4 inline-block">
                <p className="text-sm text-slate-600">
                  Focus on sleep quality, hydration, and nutrition today.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Warm Up */}
        {!currentWorkout.isRest && currentWorkout.warmUp && (
          <div className="mb-6 sm:mb-8 bg-orange-50 rounded-xl border border-orange-200 p-4 sm:p-5">
            <h3 className="text-base sm:text-lg font-bold text-orange-900 mb-3 uppercase">Warm Up</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {currentWorkout.warmUp.map((wu, idx) => (
                <div key={idx} className="flex justify-between items-center bg-white rounded-lg px-3 py-2 border border-orange-100">
                  <span className="text-sm text-slate-700">{wu.name}</span>
                  <span className="text-xs font-bold text-orange-600">{wu.sets}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Workout Sections */}
        {!currentWorkout.isRest && currentWorkout.sections.map((section, idx) => (
          <div key={idx} className="mb-8 sm:mb-12">
            {/* Section Header */}
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center gap-3 mb-2">
                <FitnessCenterIcon className="text-blue-600" />
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {section.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 ml-9">{section.totalSets}</p>
            </div>

            {/* Exercise Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
              {section.exercises.map((exercise) => (
                <div
                  key={exercise.number}
                  className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200"
                >
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                    Exercise {exercise.number}
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-3">
                    {exercise.name}
                  </h4>

                  {/* Sets */}
                  <div className="mb-3 pb-3 border-b border-slate-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-slate-900">{exercise.sets}</span>
                      {exercise.rest && (
                        <span className="text-xs text-slate-500">• Rest: {exercise.rest}</span>
                      )}
                    </div>
                    {exercise.rir && (
                      <p className="text-xs text-blue-600 mt-1">{exercise.rir}</p>
                    )}
                  </div>

                  {/* Notes */}
                  {exercise.notes && (
                    <div className="mb-3">
                      <p className="text-sm text-slate-700 italic">↳ {exercise.notes}</p>
                    </div>
                  )}

                  {/* Alternatives */}
                  {exercise.alt && exercise.alt.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Alternatives:</p>
                      <ul className="text-xs text-slate-600 space-y-1">
                        {exercise.alt.map((alt, altIdx) => (
                          <li key={altIdx}>• {alt}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Core Section */}
        {!currentWorkout.isRest && currentWorkout.core && (
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-5 sm:p-6 shadow-md">
            <div className="flex items-start gap-3 mb-4">
              <WarningAmberIcon className="text-amber-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 uppercase">
                  Core (McGill Big 3)
                </h3>
                <p className="text-sm sm:text-base text-slate-700 mb-4">
                  Non-negotiable post-PLDD maintenance protocol.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {currentWorkout.core.map((core) => (
                    <div
                      key={core.name}
                      className="bg-white rounded-lg px-4 py-3 flex justify-between items-center border border-amber-200 shadow-sm"
                    >
                      <span className="text-sm font-bold text-slate-900 uppercase">{core.name}</span>
                      <span className="text-sm font-bold text-amber-600">{core.sets}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!currentWorkout.isRest && currentWorkout.sections.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500 text-lg">No workout scheduled for this day</p>
          </div>
        )}
      </main>

      {/* Bottom Navigation - Prev/Next */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 shadow-lg z-50">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Previous Button */}
            <button
              onClick={goToPrevDay}
              disabled={isPrevDisabled}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all ${
                isPrevDisabled
                  ? 'bg-slate-50 cursor-not-allowed opacity-40'
                  : 'bg-slate-100 hover:bg-slate-200 active:scale-95'
              }`}
            >
              <ChevronLeftIcon className="text-slate-700" />
              <span className="text-sm font-semibold text-slate-700">Prev</span>
            </button>

            {/* Current Day Display */}
            <div className="flex-1 text-center">
              <span className="text-xl font-bold text-slate-900">{selectedDay}</span>
            </div>

            {/* Next Button */}
            <button
              onClick={goToNextDay}
              disabled={isNextDisabled}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all ${
                isNextDisabled
                  ? 'bg-slate-50 cursor-not-allowed opacity-40'
                  : 'bg-slate-100 hover:bg-slate-200 active:scale-95'
              }`}
            >
              <span className="text-sm font-semibold text-slate-700">Next</span>
              <ChevronRightIcon className="text-slate-700" />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}