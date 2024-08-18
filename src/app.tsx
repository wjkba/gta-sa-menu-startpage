import { useEffect, useState } from "preact/hooks";
import LinkMenu from "./components/LinkMenu";
import { getDbArray, initDb, Website } from "./db";
import SettingsMenu from "./components/Settings/SettingsMenu";
import SearchBar from "./components/SearchBar";

//TODO: SEARCH ENGINES INPUTS AND SETTINGS TOGGLIN OFF AND ON

export function App() {
  const [currentBackground, setCurrentBackground] = useState("");
  const [websites, setWebsites] = useState<Website[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [isSearchBarActive, setIsSearchBarActive] = useState(false);

  useEffect(() => {
    loadBackground();
    loadDatabaseWebsites();
  }, []);

  function loadBackground() {
    const currentLocalBackground = localStorage.getItem("background");
    if (currentLocalBackground) {
      setCurrentBackground(currentLocalBackground);
    } else {
      setCurrentBackground("bg1");
      localStorage.setItem("background", "bg1");
    }
  }

  async function loadDatabaseWebsites() {
    await initDb();
    const dbArray = await getDbArray();
    if (dbArray) setWebsites(dbArray);
  }

  function toggleSettings() {
    setShowSettings((s) => !s);
  }

  return (
    <div class={"bg-black flex justify-center items-center h-screen w-full"}>
      <div class={"relative overflow-hidden w-full max-w-[1600px] h-screen"}>
        <main class={"lg:px-[120px]  px-8 select-none"}>
          <img
            src={`/images/${currentBackground}.png`}
            alt={"background"}
            class={"right-0 absolute md:block hidden z-0"}
          />

          {!showSettings ? (
            <div
              class={" w-full max-w-[600px] lg:pt-[120px] pt-16 z-1 relative"}
            >
              <div class={"md:max-w-[450px]  mb-8"}>
                <SearchBar
                  search="google"
                  setIsSearchBarActive={setIsSearchBarActive}
                />
                <SearchBar
                  search="duck"
                  setIsSearchBarActive={setIsSearchBarActive}
                />
                <SearchBar
                  search="youtube"
                  setIsSearchBarActive={setIsSearchBarActive}
                />
              </div>
              <LinkMenu
                sites={websites}
                isSearchBarActive={isSearchBarActive}
                toggleSettings={toggleSettings}
              />
            </div>
          ) : (
            <div class={"max-w-[664px] w-full lg:pt-[120px] pt-16"}>
              <SettingsMenu
                sites={websites}
                refreshDatabase={loadDatabaseWebsites}
                toggleSettings={toggleSettings}
                currentBackground={currentBackground}
                setCurrentBackground={setCurrentBackground}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
