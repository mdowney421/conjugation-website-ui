"use client";

import { useRef, useState } from "react";
import Button from "./Button";

const MAX_LIMIT_MINUTES = 180;
const DEFAULT_LIMIT_MINUTES = 5;

// Kept in sync with the .timer-wheel-item / .timer-wheel-spacer heights in
// App.css -- the spacer has to be exactly half the wheel's visible height
// (minus half an item) for the first/last minute to be able to scroll-snap
// to the center.
const WHEEL_ITEM_HEIGHT = 36;
const WHEEL_VISIBLE_COUNT = 5;
const WHEEL_SPACER_HEIGHT = (WHEEL_ITEM_HEIGHT * (WHEEL_VISIBLE_COUNT - 1)) / 2;

const WHEEL_MINUTES = Array.from({ length: MAX_LIMIT_MINUTES }, (_, i) => i + 1);

const PRESET_MINUTES: (number | null)[] = [1, 3, 5, 10, null];

const presetLabel = (minutes: number | null) =>
  minutes === null ? "No limit" : `${minutes} min`;

type TimerStatProps = {
  seconds: number;
  label: string;
  lowTime?: boolean;
  // When provided, the timer becomes clickable, letting the user choose a
  // practice time limit instead of just displaying elapsed time. Passing
  // `undefined` for currentLimitMinutes means no limit has been chosen yet,
  // which shows a "Set timer" prompt instead of a ticking clock.
  currentLimitMinutes?: number | null;
  onSetLimitMinutes?: (minutes: number | null) => void;
};

const formatElapsedTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

const TimerStat = ({
  seconds,
  label,
  lowTime = false,
  currentLimitMinutes,
  onSetLimitMinutes,
}: TimerStatProps) => {
  const [editMode, setEditMode] = useState<"closed" | "presets" | "custom">(
    "closed",
  );
  const [wheelValue, setWheelValue] = useState(DEFAULT_LIMIT_MINUTES);
  const wheelRef = useRef<HTMLDivElement>(null);
  const wheelFrame = useRef<number | null>(null);

  const editable = onSetLimitMinutes !== undefined;
  const hasChosenLimit = currentLimitMinutes !== undefined;
  const isOpen = editMode !== "closed";

  const choosePreset = (minutes: number | null) => {
    onSetLimitMinutes?.(minutes);
    setEditMode("closed");
  };

  const startCustom = () => {
    const initial = currentLimitMinutes ?? DEFAULT_LIMIT_MINUTES;
    setWheelValue(initial);
    setEditMode("custom");
    requestAnimationFrame(() => {
      if (wheelRef.current) {
        wheelRef.current.scrollTop = (initial - 1) * WHEEL_ITEM_HEIGHT;
      }
    });
  };

  const handleWheelScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = event.currentTarget.scrollTop;
    if (wheelFrame.current !== null) return;
    wheelFrame.current = requestAnimationFrame(() => {
      const index = Math.round(scrollTop / WHEEL_ITEM_HEIGHT);
      const minutes = Math.min(Math.max(index + 1, 1), MAX_LIMIT_MINUTES);
      setWheelValue(minutes);
      wheelFrame.current = null;
    });
  };

  const commitWheel = () => {
    onSetLimitMinutes?.(wheelValue);
    setEditMode("closed");
  };

  const className = `stat-card stat-card--timer${lowTime ? " low-time" : ""}${
    editable ? " timer-editable" : ""
  }`;

  const content = hasChosenLimit ? (
    <>
      <span className="stat-value">{formatElapsedTime(seconds)}</span>
      <span className="stat-label">{label}</span>
    </>
  ) : (
    <span className="stat-value stat-value--cta">Set timer</span>
  );

  if (!editable) {
    return (
      <div className={className}>
        <span className="stat-icon" aria-hidden="true">
          ⏱️
        </span>
        {content}
      </div>
    );
  }

  return (
    <div className="timer-stat-wrap">
      <button
        type="button"
        className={className}
        onClick={() => setEditMode(isOpen ? "closed" : "presets")}
      >
        <span className="stat-icon" aria-hidden="true">
          ⏱️
        </span>
        {content}
      </button>

      {isOpen && (
        <>
          <div
            className="timer-dropdown-backdrop"
            onClick={() => setEditMode("closed")}
          />
          <div className="timer-dropdown">
            {editMode === "presets" ? (
              <div className="timer-presets">
                {PRESET_MINUTES.map((minutes) => (
                  <button
                    key={presetLabel(minutes)}
                    type="button"
                    className={`chip${currentLimitMinutes === minutes ? " selected" : ""}`}
                    onClick={() => choosePreset(minutes)}
                  >
                    {presetLabel(minutes)}
                  </button>
                ))}
                <button type="button" className="chip" onClick={startCustom}>
                  Custom
                </button>
              </div>
            ) : (
              <div className="timer-wheel-picker">
                <div className="timer-wheel-viewport">
                  <div className="timer-wheel-highlight" aria-hidden="true" />
                  <div
                    ref={wheelRef}
                    className="timer-wheel"
                    onScroll={handleWheelScroll}
                  >
                    <div className="timer-wheel-spacer" />
                    {WHEEL_MINUTES.map((minute) => (
                      <div
                        key={minute}
                        className={`timer-wheel-item${
                          minute === wheelValue ? " active" : ""
                        }`}
                      >
                        {minute}
                      </div>
                    ))}
                    <div className="timer-wheel-spacer" />
                  </div>
                </div>
                <div className="timer-wheel-footer">
                  <span className="timer-wheel-unit">min</span>
                  <Button className="btn-sm" onClick={commitWheel}>
                    Set
                  </Button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TimerStat;
