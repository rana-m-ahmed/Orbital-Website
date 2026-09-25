"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Options = {
  /** Number of discrete states in the demonstration. */
  steps: number;
  /** How long each state holds before advancing (§3: 600–900ms). */
  hold?: number;
  /** Delay before the first state, so copy is readable first (§4). */
  startDelay?: number;
  /** Play as soon as the element is in view. */
  active: boolean;
  /** Reduced motion rests on the resolved state and never advances (§13). */
  reducedMotion: boolean;
};

export type Sequence = {
  /** Index of the current state. */
  index: number;
  /** True while the sequence is advancing. */
  playing: boolean;
  /** True once the sequence has reached its completion state. */
  complete: boolean;
  /** Restart from the first state. */
  replay: () => void;
  /** Jump straight to a state — used when a person picks a tab. */
  goTo: (index: number) => void;
  /** Stop advancing; any user interaction pauses autoplay (§3). */
  pause: () => void;
};

/**
 * §3 / §13 — every demonstration plays once and stops on a completion state.
 * Nothing on this site loops forever, and nothing plays off-screen (§38).
 *
 * All state changes happen inside timer or observer callbacks; the resting
 * state for reduced motion is derived rather than assigned after the fact.
 */
export function useSequence({
  steps,
  hold = 780,
  startDelay = 850,
  active,
  reducedMotion,
}: Options): Sequence {
  const [rawIndex, setIndex] = useState(0);
  const [requested, setRequested] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };

  const index = reducedMotion ? steps - 1 : rawIndex;
  const atEnd = index >= steps - 1;
  const playing = requested && !atEnd && !reducedMotion;

  const pause = useCallback(() => {
    clear();
    setRequested(false);
  }, []);

  const replay = useCallback(() => {
    clear();
    if (reducedMotion) return;
    setIndex(0);
    setRequested(true);
    setHasRun(true);
  }, [reducedMotion]);

  const goTo = useCallback(
    (next: number) => {
      clear();
      setRequested(false);
      setIndex(Math.max(0, Math.min(steps - 1, next)));
    },
    [steps],
  );

  /* Autoplay once, only in view, only when motion is welcome. */
  useEffect(() => {
    if (!active || hasRun || reducedMotion) return;

    timer.current = setTimeout(() => {
      setRequested(true);
      setHasRun(true);
    }, startDelay);

    return clear;
  }, [active, hasRun, reducedMotion, startDelay]);

  /* Advance — and simply stop scheduling when out of view or finished. */
  useEffect(() => {
    if (!requested || !active || reducedMotion) return;
    if (rawIndex >= steps - 1) return;

    timer.current = setTimeout(() => setIndex((value) => value + 1), hold);
    return clear;
  }, [requested, active, reducedMotion, rawIndex, steps, hold]);

  useEffect(() => clear, []);

  return { index, playing, complete: atEnd, replay, goTo, pause };
}
