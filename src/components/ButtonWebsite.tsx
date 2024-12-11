import { ReactNode } from "preact/compat";
import { playSound } from "../utils/audioUtils";

interface ButtonWebsiteProps {
  children: ReactNode;
  link: string;
}

export default function ButtonWebsite({ children, link }: ButtonWebsiteProps) {
  function openWebsite() {
    window.location.href = link;
  }

  function handleButtonClick() {
    if (localStorage.getItem("soundEnabled") === "false") {
      openWebsite();
    } else {
      playSound("enter", openWebsite);
    }
  }

  return (
    <button
      onClick={handleButtonClick}
      class={`focusable outline-none focus:text-[#a8c3e7] text-[#4b5b6a] hover:text-[#a8c3e7] text-left  font-bankGothic text-3xl font-medium`}
    >
      {children}
    </button>
  );
}
