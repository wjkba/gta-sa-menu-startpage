import { useEffect, useState } from "preact/hooks";
import Button from "./components/Button";
import BG1 from "./images/bg1.png";
import selectSFX from "./audio/select.mp3";
import enterSFX from "./audio/enter.mp3";

//TODO: SEARCH ENGINES INPUTS AND SETTINGS TOGGLIN OFF AND ON
const sites = [
  { name: "NOTION", link: "https://www.notion.so" },
  { name: "CODEWARS", link: "https://www.codewars.com" },
  { name: "GITHUB", link: "https://www.github.com" },
  { name: "YOUTUBE", link: "https://www.youtube.com" },
  { name: "MDN", link: "https://developer.mozilla.org" },
  { name: "DISCORD", link: "https://www.discord.com" },
  { name: "SETTINGS", link: window.location.href },
];

export function App() {
  const [activeButton, setActiveButton] = useState<number>(0);

  function playSound(soundPath: string) {
    const sound = new Audio(soundPath);
    sound.play();
  }

  useEffect(() => {
    function handleJ() {
      playSound(selectSFX);
      goDown();
    }
    function handleK() {
      playSound(selectSFX);
      goUp();
    }
    function handleEnter() {
      playSound(enterSFX);
      setTimeout(() => {
        window.location.href = sites[activeButton].link;
      }, 200);
    }

    const handleKey = (event: KeyboardEvent) => {
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
  }, [activeButton]);

  function goUp() {
    setActiveButton((a) => (a > 0 ? a - 1 : sites.length - 1));
  }

  function goDown() {
    setActiveButton((a) => (a + 1 > sites.length - 1 ? 0 : a + 1));
  }

  return (
    <div
      class={"flex justify-center items-center bg-[#a99f57] h-screen w-full"}
    >
      <div class={"bg-black relative w-full max-w-[1300px] h-screen"}>
        <main>
          <img class={"absolute z-0"} src={BG1} />
          <div class={"min-h-[20vh] relative z-1 w-full "}></div>
          <div class={"z-1 relative flex flex-col gap-2 p-12 w-full"}>
            {sites.map((site, index) => (
              <Button link={site.link} active={index === activeButton}>
                {site.name}
              </Button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
