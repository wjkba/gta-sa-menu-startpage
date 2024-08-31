import { useEffect, useState } from "preact/hooks";
import { playSound } from "../utils/audioUtils";
import { Website } from "../db";
import ButtonWebsite from "./ButtonWebsite";
import Button from "./Button";

interface LinkMenuProps {
  sites: Website[] | [];
  toggleSettings: () => void;
  isSearchBarActive: boolean;
}

export default function LinkMenu({
  sites,
  toggleSettings,
  isSearchBarActive,
}: LinkMenuProps) {
  const [_currentIndex, setCurrentIndex] = useState(0);
  const soundEnabled = localStorage.getItem("soundEnabled") !== "false";
  let focusableElements: NodeList;

  useEffect(() => {
    function handleDown() {
      if (soundEnabled) playSound("select");
      goDown();
    }
    function handleUp() {
      if (soundEnabled) playSound("select");
      goUp();
    }
    function getFocusableElements() {
      focusableElements = document.querySelectorAll(".focusable");
      console.log(focusableElements);
    }

    getFocusableElements();

    if (!isSearchBarActive && focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement).focus();
      setCurrentIndex(0);
    }

    const handleKeyPress = (event: KeyboardEvent) => {
      if (isSearchBarActive) return;

      switch (event.key) {
        case "j":
        case "ArrowDown":
        case "s":
          handleDown();
          break;
        case "k":
        case "ArrowUp":
        case "w":
          handleUp();
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [sites, isSearchBarActive]);

  function goUp() {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex > 0 ? prevIndex - 1 : sites.length;
      (focusableElements[newIndex] as HTMLElement).focus();
      return newIndex;
    });
  }

  function goDown() {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1 <= sites.length ? prevIndex + 1 : 0;
      (focusableElements[newIndex] as HTMLElement).focus();
      return newIndex;
    });
  }

  return (
    <>
      <div class={"flex flex-col gap-2 mb-6 "}>
        {sites.map((site, index) => (
          <ButtonWebsite key={index} link={site.link}>
            {site.name}
          </ButtonWebsite>
        ))}
      </div>
      <Button text="SETTINGS" click={toggleSettings} />
    </>
  );
}
