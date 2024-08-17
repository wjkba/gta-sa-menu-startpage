import { useEffect, useState } from "preact/hooks";
import Button from "../Button";
import AddWebsiteForm from "./AddWebsiteForm";
import RemoveWebsiteList from "./RemoveWebsiteList";
import { type Website } from "../../db";

//TODO: background fix & change background
//TODO: layout options

interface SettingsMenuProps {
  toggleSettings: () => void;
  refreshDatabase: () => void;
  sites: Website[];
}

export default function SettingsMenu({
  toggleSettings,
  refreshDatabase,
  sites,
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
      <div class={"max-w-[600px] z-1 relative grid gap-12 p-12"}>
        <section>
          <h1 class={"font-beckett text-[#9ec8ed] text-5xl mb-2"}>
            Add to List
          </h1>
          <AddWebsiteForm refreshDatabase={refreshDatabase} />
        </section>

        <section>
          <h1 class={"font-beckett text-[#9ec8ed] text-5xl mb-2"}>
            Remove from List
          </h1>
          <RemoveWebsiteList sites={sites} refreshDatabase={refreshDatabase} />
        </section>

        <section>
          <h1 class={"font-beckett text-[#9ec8ed] text-5xl mb-2"}>
            Sound Effects
          </h1>
          <Button
            click={handleSoundToggle}
            text={!soundEnabled ? "OFF" : "ON"}
          />
        </section>
        <Button click={handleBack} text="BACK" sound="back" active={false} />
      </div>
    );
  }

  return <></>;
}
