import { useEffect, useState } from "preact/hooks";
import { playSound } from "../utils/audioUtils";
import { Website } from "../db";
import ButtonWebsite from "./ButtonWebsite";
import Button from "./Button";

interface LinkMenuProps {
  sites: Website[] | [];
  toggleSettings: () => void;
}

export default function LinkMenu({ sites, toggleSettings }: LinkMenuProps) {
  const [activeButton, setActiveButton] = useState<number>(0);
  const soundEnabled = localStorage.getItem("soundEnabled") !== "false";

  useEffect(() => {
    function handleJ() {
      if (soundEnabled) playSound("select");
      goDown();
    }
    function handleK() {
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

    const handleKey = (event: KeyboardEvent) => {
      //TODO: arrow navigation, left right column jump
      switch (event.key) {
        case "j":
          handleJ();
          break;
        case "k":
          handleK();
          break;
        case "Enter":
          handleEnter();
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [activeButton, sites]);

  function goUp() {
    setActiveButton((a) => (a > 0 ? a - 1 : sites.length));
  }

  function goDown() {
    setActiveButton((a) => (a + 1 > sites.length ? 0 : a + 1));
  }

  return (
    <div class={"z-1 relative flex flex-col gap-2 p-12 w-full"}>
      {sites.map((site, index) => (
        <ButtonWebsite link={site.link} active={index === activeButton}>
          {site.name}
        </ButtonWebsite>
      ))}
      <Button
        text="SETTINGS"
        click={toggleSettings}
        active={sites.length === activeButton}
      />
    </div>
  );
}
