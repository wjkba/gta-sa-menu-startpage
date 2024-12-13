import { useEffect, useState } from "preact/hooks";
import Button from "../Button";
import AddWebsiteForm from "./AddWebsiteForm";
import { type Website } from "../../db";
import BackgroundChange from "./BackgroundChange";
import ToggleSearchEngines from "./ToggleSearchEngines";
import ManageWebsitesList from "./ManageWebsitesList";
import VolumeSetting from "./VolumeSetting";
import LayoutChange from "./LayoutChange";

interface SettingsMenuProps {
  toggleSettings: () => void;
  refreshDatabase: () => void;
  sites: Website[];
  currentBackground: string;
  setCurrentBackground: (bgX: string) => void;
  searchEngines: string[];
  setSearchEngines: (searchEngines: string[]) => void;
}

export default function SettingsMenu({
  toggleSettings,
  refreshDatabase,
  sites,
  currentBackground,
  setCurrentBackground,
  searchEngines,
  setSearchEngines,
}: SettingsMenuProps) {
  const [isReady, setIsReady] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(
    localStorage.getItem("soundEnabled") !== "false"
  );

  useEffect(() => {
    document.fonts.load("1em Beckett").then(() => setIsReady(true));
  }, []);

  function handleBack() {
    refreshDatabase();
    toggleSettings();
    //window.location.reload();
  }

  function handleSoundToggle() {
    if (
      localStorage.getItem("soundEnabled") === null ||
      localStorage.getItem("soundEnabled") === "true"
    ) {
      localStorage.setItem("soundEnabled", "false");
      setSoundEnabled(false);
    } else {
      localStorage.setItem("soundEnabled", "true");
      setSoundEnabled(true);
    }
  }

  if (isReady) {
    return (
      <>
        <div
          class={
            "max-h-[80vh] overflow-auto z-1 relative grid gap-12 mb-8 pr-16"
          }
        >
          <section>
            <h1 class={"font-beckett text-[#9ec8ed] md:text-5xl text-4xl mb-2"}>
              Add a New Website
            </h1>
            <AddWebsiteForm refreshDatabase={refreshDatabase} />
          </section>

          <section>
            <h1 class={"font-beckett text-[#9ec8ed] md:text-5xl text-4xl mb-2"}>
              Manage Websites
            </h1>
            <ManageWebsitesList
              sites={sites}
              refreshDatabase={refreshDatabase}
            />
          </section>

          <section>
            <h1 class={"font-beckett text-[#9ec8ed] md:text-5xl text-4xl mb-2"}>
              Websites Layout
            </h1>
            <LayoutChange />
          </section>

          <section>
            <h1 class={"font-beckett text-[#9ec8ed] md:text-5xl text-4xl mb-2"}>
              Search Engines
            </h1>
            <ToggleSearchEngines
              searchEngines={searchEngines}
              setSearchEngines={setSearchEngines}
            />
          </section>

          <section>
            <h1 class={"font-beckett text-[#9ec8ed] md:text-5xl text-4xl mb-2"}>
              Sound Effects
            </h1>
            <div className={"grid gap-2"}>
              <Button
                click={handleSoundToggle}
                text={!soundEnabled ? "SFX: OFF" : "SFX: ON"}
              />
              <VolumeSetting />
            </div>
          </section>

          <section>
            <h1 class={"font-beckett text-[#9ec8ed] md:text-5xl text-4xl mb-2"}>
              Background
            </h1>
            <BackgroundChange
              currentBackground={currentBackground}
              setCurrentBackground={setCurrentBackground}
            />
          </section>
        </div>
        <div class={"bg-black fixed bottom-4 pt-6 pb-4 w-full"}>
          <Button click={handleBack} text="BACK" sound="back" />
        </div>
      </>
    );
  }

  return <></>;
}
