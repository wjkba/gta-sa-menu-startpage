import { playSoundDelay } from "../utils/audioUtils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  active?: boolean;
  sound?: string;
  click?: () => void;
}

export default function Button({
  text,
  active = false,
  click,
  sound = "enter",
  ...rest
}: ButtonProps) {
  function handleClick() {
    const soundEnabled = localStorage.getItem("soundEnabled") !== "false";
    if (click) {
      if (click.name === "handleSoundToggle") {
        if (soundEnabled) click();
        else {
          playSoundDelay(sound, click);
        }
        return;
      }
      if (!soundEnabled) click();
      else {
        playSoundDelay(sound, click);
      }
    }
  }

  return (
    <button
      {...rest}
      onClick={handleClick}
      class={`${
        active ? "text-[#a8c3e7]" : "text-[#4b5b6a]"
      } hover:text-[#a8c3e7] text-left  font-bankGothic text-3xl font-medium`}
    >
      {text}
    </button>
  );
}
