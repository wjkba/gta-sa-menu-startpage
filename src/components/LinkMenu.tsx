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
  const [layout, setLayout] = useState(" ");
  const soundEnabled = localStorage.getItem("soundEnabled") !== "false";
  let focusableElements: NodeList;

  useEffect(() => {
    const localLayout = localStorage.getItem("layout");
    if (localLayout === "oneColumn") setLayout(" ");
    if (localLayout === "twoColumns")
      setLayout("lg:grid lg:grid-cols-2 lg:overflow-hidden ");
    else {
      localStorage.setItem("layout", "oneColumn");
    }
  }, []);

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
      let newIndex;
      if (localStorage.getItem("layout") === "twoColumns") {
        if (prevIndex - 2 >= 0) newIndex = prevIndex - 2;
        else {
          if (prevIndex % 2 === 0)
            newIndex =
              sites.length % 2 === 0 ? sites.length - 2 : sites.length - 1;
          else newIndex = sites.length - 2;
        }
      } else newIndex = prevIndex > 0 ? prevIndex - 1 : sites.length - 1;

      (focusableElements[newIndex] as HTMLElement).focus();
      return newIndex;
    });
  }

  function goDown() {
    setCurrentIndex((prevIndex) => {
      let newIndex;
      if (localStorage.getItem("layout") === "twoColumns") {
        if (prevIndex + 2 < sites.length) newIndex = prevIndex + 2;
        else if (prevIndex % 2 === 0) newIndex = 1;
        else newIndex = 0;
      } else newIndex = prevIndex + 1 < sites.length ? prevIndex + 1 : 0;

      (focusableElements[newIndex] as HTMLElement).focus();
      return newIndex;
    });
  }

  return (
    <>
      <div class={`${layout} flex flex-col gap-2 max-h-[70vh] overflow-auto`}>
        {sites.map((site, index) => (
          <ButtonWebsite key={index} link={site.link}>
            {site.name}
          </ButtonWebsite>
        ))}
      </div>
      <div class={"bg-black fixed bottom-4 pt-6 pb-4 w-full"}>
        <Button text="SETTINGS" click={toggleSettings} />
      </div>
    </>
  );
}
