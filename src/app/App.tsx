import {
  IconChevronLeft,
  IconChevronRight,
  IconDownload,
  IconMoonStars
} from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import { DayKey, workoutData5x } from '../data/workoutData';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const dayLabels: Record<DayKey, string> = {
  SAT: 'Saturday',
  SUN: 'Sunday',
  MON: 'Monday',
  TUE: 'Tuesday',
  WED: 'Wednesday',
  THU: 'Thursday',
  FRI: 'Friday',
};

const PICKER_LOOP_COPIES = 9;

export default function App() {
  const days: DayKey[] = ['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI'];
  const pickerDays = Array.from({ length: PICKER_LOOP_COPIES }, (_, copyIndex) =>
    days.map((day) => ({
      day,
      key: `${copyIndex}-${day}`,
    }))
  ).flat();
  const getTodayInJakarta = (): DayKey => {
    const weekday = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      timeZone: 'Asia/Jakarta',
    })
      .format(new Date())
      .slice(0, 3)
      .toUpperCase();

    return days.find((day) => day === weekday) ?? 'FRI';
  };

  const [selectedDay, setSelectedDay] = useState<DayKey>(getTodayInJakarta);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstallPopup, setShowInstallPopup] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isDayMenuOpen, setIsDayMenuOpen] = useState(false);
  const [focusedDay, setFocusedDay] = useState<DayKey>(selectedDay);
  const dayPickerRef = useRef<HTMLDivElement | null>(null);
  const dayOptionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const currentWorkout = workoutData5x[selectedDay];
  const currentDayIndex = days.indexOf(selectedDay);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };

    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;

    setIsInstalled(isStandalone);
    setIsMobileView(window.matchMedia('(max-width: 640px)').matches);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  useEffect(() => {
    if (!isInstalled && isMobileView) {
      const dismissed = window.sessionStorage.getItem('install-popup-dismissed');
      setShowInstallPopup(dismissed !== 'true');
    } else {
      setShowInstallPopup(false);
    }
  }, [isInstalled, isMobileView]);

  useEffect(() => {
    if (!isDayMenuOpen) return;

    setFocusedDay(selectedDay);

    const selectedIndex = days.indexOf(selectedDay);
    const middleIndex = Math.floor(PICKER_LOOP_COPIES / 2) * days.length + selectedIndex;

    window.requestAnimationFrame(() => {
      dayOptionRefs.current[middleIndex]?.scrollIntoView({
        block: 'center',
        behavior: 'auto',
      });
    });
  }, [isDayMenuOpen, selectedDay]);

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

  const handleInstallClick = async () => {
    if (!installPrompt) return;

    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;

    if (choice.outcome === 'accepted') {
      setInstallPrompt(null);
      setShowInstallPopup(false);
    }
  };

  const dismissInstallPopup = () => {
    window.sessionStorage.setItem('install-popup-dismissed', 'true');
    setShowInstallPopup(false);
  };

  const handleDaySelect = (day: DayKey) => {
    setSelectedDay(day);
    setFocusedDay(day);
    setIsDayMenuOpen(false);
  };

  const getDayButtonClassName = (day: DayKey) => {
    if (day === focusedDay) {
      return 'scale-100 text-white opacity-100';
    }

    const focusedIndex = days.indexOf(focusedDay);
    const dayIndex = days.indexOf(day);
    const rawDistance = Math.abs(dayIndex - focusedIndex);
    const distance = Math.min(rawDistance, days.length - rawDistance);

    if (distance === 1) {
      return 'scale-[0.98] text-white/60 opacity-90';
    }

    return 'scale-95 text-white/25 opacity-70';
  };

  const handleDayPickerScroll = () => {
    const picker = dayPickerRef.current;

    if (!picker) return;

    const cycleHeight = picker.scrollHeight / PICKER_LOOP_COPIES;

    if (picker.scrollTop < cycleHeight) {
      picker.scrollTop += cycleHeight * Math.floor(PICKER_LOOP_COPIES / 2);
    } else if (picker.scrollTop > cycleHeight * (PICKER_LOOP_COPIES - 2)) {
      picker.scrollTop -= cycleHeight * Math.floor(PICKER_LOOP_COPIES / 2);
    }

    const pickerCenter = picker.scrollTop + picker.clientHeight / 2;
    let closestDay = focusedDay;
    let closestDistance = Number.POSITIVE_INFINITY;

    dayOptionRefs.current.forEach((element, index) => {
      if (!element) return;

      const elementCenter = element.offsetTop + element.offsetHeight / 2;
      const distance = Math.abs(elementCenter - pickerCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestDay = pickerDays[index].day;
      }
    });

    if (closestDay !== focusedDay) {
      setFocusedDay(closestDay);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 sm:px-6 sm:py-6">
          {/* Title - Centered */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-base leading-tight sm:text-2xl font-bold text-slate-900 tracking-tight text-left sm:text-center">
                PPL Upper Bias Hypertrophy Protocol
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">Ahmad Aji Santoso</p>
          </div>
          {!isInstalled && (
            <div className="mt-3 flex justify-center">
              {installPrompt ? (
                <button
                  onClick={handleInstallClick}
                  className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100"
                >
                  <IconDownload className="h-4 w-4" />
                  Install App
                </button>
              ) : (
                <p className="text-xs text-slate-500">
                  You can install this app from your browser menu or share options.
                </p>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
        {/* Day Title */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl leading-tight sm:text-3xl font-bold text-slate-900 text-center sm:text-left border-b-2 border-blue-600 pb-3 inline-block w-full break-words">
            {selectedDay} — {currentWorkout.title}
          </h2>
        </div>

        {/* Rest Day */}
        {currentWorkout.isRest && (
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-200 overflow-hidden shadow-lg">
            <div className="p-8 sm:p-12 text-center">
              <div className="flex justify-center mb-6">
                <IconMoonStars className="text-purple-600 w-[72px] h-[72px]" />
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
                <img
                  src="/launchericon-512x512-loader.png"
                  alt=""
                  className="h-5 w-5 rounded object-cover"
                />
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
                  className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm hover:border-blue-300 transition-all duration-200"
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
          <div className="bg-amber-50 border border-amber-500 rounded-xl p-5 sm:p-6">
            <div className="flex items-start gap-3 mb-4">
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

      <div className="fixed inset-x-0 bottom-5 z-50 flex justify-center px-6">
        <button
          onClick={() => setIsDayMenuOpen((open) => !open)}
          className="inline-flex min-w-28 items-center justify-center rounded-full border border-slate-200 bg-white/92 px-6 py-3 text-xl font-bold text-slate-900 shadow-lg backdrop-blur-md transition-all hover:scale-[1.02] hover:bg-white"
        >
          {selectedDay}
        </button>
      </div>

      {isDayMenuOpen && (
        <div className="fixed inset-0 z-[70]">
          <button
            aria-label="Close day picker"
            onClick={() => setIsDayMenuOpen(false)}
            className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px]"
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-20 flex justify-center px-6">
            <div className="pointer-events-auto relative w-full max-w-[320px] overflow-hidden rounded-[2rem] border border-white/70 bg-linear-to-b from-slate-900 via-slate-950 to-blue-950 px-6 py-6 shadow-2xl">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-linear-to-b from-slate-900 via-slate-900/85 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-blue-950 via-blue-950/85 to-transparent" />
              <div className="pointer-events-none absolute inset-x-6 top-1/2 h-14 -translate-y-1/2 rounded-2xl border border-white/25 bg-white/10 shadow-inner" />

              <div
                ref={dayPickerRef}
                onScroll={handleDayPickerScroll}
                className="relative max-h-56 snap-y snap-mandatory space-y-1 overflow-y-auto py-16 text-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {pickerDays.map(({ day, key }, index) => (
                  <button
                    key={key}
                    ref={(element) => {
                      dayOptionRefs.current[index] = element;
                    }}
                    onClick={() => handleDaySelect(day)}
                    className={`block w-full snap-center rounded-2xl px-3 py-2 text-2xl font-medium tracking-tight transition-all duration-200 ${getDayButtonClassName(day)}`}
                    style={day === selectedDay ? { textShadow: '0 0 18px rgba(255,255,255,0.22)' } : undefined}
                  >
                    {dayLabels[day]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showInstallPopup && (
        <div className="fixed inset-x-4 bottom-24 z-[60] sm:hidden">
          <div className="rounded-2xl border border-blue-200 bg-white p-4 shadow-lg">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-slate-900">
                  Install this app on your device
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-600">
                  Add this workout app to your home screen for faster access and a more app-like experience.
                </p>
              </div>
              <button
                onClick={dismissInstallPopup}
                className="text-xs font-semibold text-slate-500"
              >
                Later
              </button>
            </div>

            <div className="mt-4 flex items-center gap-3">
              {installPrompt ? (
                <button
                  onClick={handleInstallClick}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  <IconDownload className="h-4 w-4" />
                  Install Now
                </button>
              ) : (
                <p className="text-xs text-slate-500">
                  Use your browser menu or share options to install this app or add it to your home screen.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
