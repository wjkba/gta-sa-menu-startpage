import { useEffect, useState } from "preact/hooks";
import LinkMenu from "./components/LinkMenu";
import BG1 from "./images/bg1.png";
import { getDbArray, initDb, Website } from "./db";
import SettingsMenu from "./components/Settings/SettingsMenu";

//TODO: SEARCH ENGINES INPUTS AND SETTINGS TOGGLIN OFF AND ON

export function App() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [showSettings, setShowSettings] = useState(false);

  async function loadDatabaseWebsites() {
    await initDb();
    const dbArray = await getDbArray();
    if (dbArray) setWebsites(dbArray);
  }

  useEffect(() => {
    loadDatabaseWebsites();
  }, []);

  function toggleSettings() {
    setShowSettings((s) => !s);
  }

  return (
    <div class={"bg-black flex justify-center items-center h-screen w-full"}>
      <div class={"bg-black relative w-full max-w-[1600px] h-screen"}>
        <main class={"select-none"}>
          <img class={"absolute z-0"} src={BG1} />

          {!showSettings ? (
            <LinkMenu sites={websites} toggleSettings={toggleSettings} />
          ) : (
            <SettingsMenu
              sites={websites}
              refreshDatabase={loadDatabaseWebsites}
              toggleSettings={toggleSettings}
            />
          )}
        </main>
      </div>
    </div>
  );
}
