import { useEffect, useState } from "preact/hooks";
import LinkMenu from "./components/LinkMenu";
import { getDbArray, initDb, Website } from "./db";
import SettingsMenu from "./components/Settings/SettingsMenu";
import SearchBar, { SearchEngines } from "./components/SearchBar";

export function App() {
  const [currentBackground, setCurrentBackground] = useState("");
  const [searchEngines, setSearchEngines] = useState<string[]>([]);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [isSearchBarActive, setIsSearchBarActive] = useState(false);

  useEffect(() => {
    loadBackground();
    loadSearchEngines();
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

  function loadSearchEngines() {
    const defaultSearchEngines = ["google", "duck", "youtube"];
    const localSearchEngines = localStorage.getItem("searchEngines");
    if (localSearchEngines) {
      setSearchEngines(JSON.parse(localSearchEngines));
    } else {
      setSearchEngines(defaultSearchEngines);
      localStorage.setItem(
        "searchEngines",
        JSON.stringify(defaultSearchEngines)
      );
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
    <div
      class={"bg-black flex justify-center items-center min-h-screen w-full"}
    >
      <div class={"relative overflow-hidden w-full max-w-[1680] min-h-screen"}>
        <main class={"lg:px-28 px-8 select-none"}>
          <img
            src={`images/${currentBackground}.webp`}
            alt={"background"}
            class={"right-0 absolute md:block hidden z-0"}
          />

          {!showSettings ? (
            <div
              class={" w-full max-w-[600px] lg:pt-[60px] pt-16 z-1 relative"}
            >
              <div class={"md:max-w-[450px]  mb-8"}>
                {searchEngines.map((engine) => (
                  <SearchBar
                    search={engine as SearchEngines}
                    setIsSearchBarActive={setIsSearchBarActive}
                  />
                ))}
              </div>
              <LinkMenu
                sites={websites}
                isSearchBarActive={isSearchBarActive}
                toggleSettings={toggleSettings}
              />
            </div>
          ) : (
            <div class={"lg:max-w-[40vw] w-full lg:pt-[60px] pt-16"}>
              <SettingsMenu
                sites={websites}
                refreshDatabase={loadDatabaseWebsites}
                toggleSettings={toggleSettings}
                currentBackground={currentBackground}
                setCurrentBackground={setCurrentBackground}
                searchEngines={searchEngines}
                setSearchEngines={setSearchEngines}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
