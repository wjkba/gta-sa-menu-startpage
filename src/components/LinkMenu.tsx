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
  const [activeButton, setActiveButton] = useState<number>(0);
  const soundEnabled = localStorage.getItem("soundEnabled") !== "false";

  useEffect(() => {
    function handleDown() {
      if (soundEnabled) playSound("select");
      goDown();
    }
    function handleUp() {
      if (soundEnabled) playSound("select");
      goUp();
    }
    function handleEnter() {
      if (soundEnabled) playSound("enter");
      setTimeout(() => {
        if (activeButton <= sites.length - 1) {
          window.location.href = sites[activeButton].link;
        } else {
          console.log("SETTINGS");
          toggleSettings();
        }
      }, 200);
    }

    const handleKeyPress = (event: KeyboardEvent) => {
      if (isSearchBarActive) return;

      //TODO: left right column jump
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
        case "Enter":
          handleEnter();
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [activeButton, sites, isSearchBarActive]);

  function goUp() {
    setActiveButton((a) => (a > 0 ? a - 1 : sites.length));
  }

  function goDown() {
    setActiveButton((a) => (a + 1 > sites.length ? 0 : a + 1));
  }

  return (
    <>
      <div class={"flex flex-col gap-2 mb-6 "}>
        {sites.map((site, index) => (
          <ButtonWebsite link={site.link} active={index === activeButton}>
            {site.name}
          </ButtonWebsite>
        ))}
      </div>
      <Button
        text="SETTINGS"
        click={toggleSettings}
        active={sites.length === activeButton}
      />
    </>
  );
}
