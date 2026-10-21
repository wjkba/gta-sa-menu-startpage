import { useState } from "preact/hooks";
import { playSound } from "../../utils/audioUtils";

const BAR_COUNT = 16;
const MIN_BAR_HEIGHT_PERCENT = 20;

function clampLevel(level: number) {
  return Math.max(0, Math.min(BAR_COUNT, level));
}

function readStoredLevel() {
  const stored = parseFloat(localStorage.getItem("volume") ?? "");
  if (Number.isNaN(stored)) return BAR_COUNT;
  return clampLevel(Math.round(stored * BAR_COUNT));
}

export default function VolumeSetting() {
  const [level, setLevel] = useState(readStoredLevel);
  const [hoverLevel, setHoverLevel] = useState<number | null>(null);
  const percent = Math.round((level / BAR_COUNT) * 100);

  function changeLevel(next: number) {
    const clamped = clampLevel(next);
    if (clamped === level) return;
    setLevel(clamped);
    localStorage.setItem("volume", String(clamped / BAR_COUNT));
    if (localStorage.getItem("soundEnabled") !== "false") playSound("select");
  }

  function levelFromPointer(e: PointerEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    return clampLevel(
      Math.ceil(((e.clientX - rect.left) / rect.width) * BAR_COUNT)
    );
  }

  function handlePointerDown(e: PointerEvent) {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    changeLevel(levelFromPointer(e));
  }

  function handlePointerMove(e: PointerEvent) {
    const next = levelFromPointer(e);
    if (e.pointerType === "mouse") setHoverLevel(next);
    if ((e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) {
      changeLevel(next);
    }
  }

  function handleWheel(e: WheelEvent) {
    e.preventDefault();
    changeLevel(level + (e.deltaY < 0 ? 1 : -1));
  }

  function handleKeyDown(e: KeyboardEvent) {
    const step = { ArrowLeft: -1, ArrowRight: 1 }[e.key];
    if (step === undefined) return;
    e.preventDefault();
    changeLevel(level + step);
  }

  function barColor(i: number) {
    const isPreviewed =
      hoverLevel !== null &&
      i >= Math.min(level, hoverLevel) &&
      i < Math.max(level, hoverLevel);
    if (isPreviewed) return "bg-[#798fa8]";
    return i < level ? "bg-[#a8c3e7]" : "bg-[#4b5b6a]";
  }

  const stepButtonClass =
    "w-11 h-11 shrink-0 flex items-center justify-center text-[#4b5b6a] active:text-[#a8c3e7] outline-none touch-manipulation";

  return (
    <div
      class={
        "group flex items-center justify-between gap-4 sm:gap-8 select-none"
      }
      onWheel={handleWheel}
    >
      <span
        class={
          "font-bankGothic text-3xl font-medium text-[#4b5b6a] group-hover:text-[#a8c3e7] group-focus-within:text-[#a8c3e7]"
        }
      >
        VOLUME
      </span>
      <div class={"flex items-center sm:hidden"}>
        <button
          type="button"
          class={stepButtonClass}
          aria-label="Decrease volume"
          onClick={() => changeLevel(level - 1)}
        >
          <StepIcon />
        </button>
        <span
          class={"w-16 text-center font-bankGothic text-2xl text-[#a8c3e7]"}
          aria-live="polite"
        >
          {percent}%
        </span>
        <button
          type="button"
          class={stepButtonClass}
          aria-label="Increase volume"
          onClick={() => changeLevel(level + 1)}
        >
          <StepIcon plus />
        </button>
      </div>
      <div
        class={
          "hidden sm:flex flex-1 max-w-60 h-10 cursor-pointer touch-none outline-none"
        }
        tabIndex={0}
        role="slider"
        aria-label="Volume"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-valuetext={`${percent}%`}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setHoverLevel(null)}
      >
        {Array.from({ length: BAR_COUNT }, (_, i) => (
          <div key={i} class={"flex flex-1 items-end justify-center"}>
            <div
              class={`w-1/2 transition-colors duration-100 ${barColor(i)}`}
              style={{
                height: `${
                  MIN_BAR_HEIGHT_PERCENT +
                  ((100 - MIN_BAR_HEIGHT_PERCENT) * i) / (BAR_COUNT - 1)
                }%`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function StepIcon({ plus = false }: { plus?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      stroke="currentColor"
      stroke-width="3"
      aria-hidden="true"
    >
      <line x1="2" y1="10" x2="18" y2="10" />
      {plus && <line x1="10" y1="2" x2="10" y2="18" />}
    </svg>
  );
}
