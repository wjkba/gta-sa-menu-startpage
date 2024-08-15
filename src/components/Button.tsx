import { ReactNode } from "preact/compat";

interface ButtonProps {
  children: ReactNode;
  link: string;
  active: boolean;
}

export default function Button({ children, active, link }: ButtonProps) {
  function openWebsite() {
    window.location.href = link;
  }

  function handleButtonClick() {
    openWebsite();
  }

  return (
    <button
      onClick={handleButtonClick}
      class={`${
        active ? "text-[#a8c3e7]" : "text-[#4b5b6a]"
      } hover:text-[#a8c3e7] text-left  font-bankGothic text-4xl font-medium`}
    >
      {children}
    </button>
  );
}
