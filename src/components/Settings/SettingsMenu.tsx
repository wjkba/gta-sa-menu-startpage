import { useState } from "preact/hooks";
import Button from "../Button";
import AddWebsiteForm from "./AddWebsiteForm";
import RemoveWebsiteList from "./RemoveWebsiteList";

//TODO: sound effects toggle
//TODO: background fix & change background
//TODO: layout options

interface SettingsMenuProps {
  toggleSettings: () => void;
}

export default function SettingsMenu({ toggleSettings }: SettingsMenuProps) {
  const [soundEnabled, setSoundEnabled] = useState(
    localStorage.getItem("soundEnabled") !== "false"
  );

  function handleBack() {
    toggleSettings();
    window.location.reload();
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

  return (
    <div class={"max-w-[600px] z-1 relative grid gap-12 p-12"}>
      <section>
        <h1 class={"font-beckett text-[#9ec8ed] text-5xl mb-2"}>
          Sound Effects
        </h1>
        <Button click={handleSoundToggle} text={!soundEnabled ? "OFF" : "ON"} />
      </section>
      <section>
        <h1 class={"font-beckett text-[#9ec8ed] text-5xl mb-2"}>
          Add new website
        </h1>
        <AddWebsiteForm />
      </section>

      <section>
        <h1 class={"font-beckett text-[#9ec8ed] text-5xl mb-2"}>
          Remove websites
        </h1>
        <RemoveWebsiteList />
      </section>
      <Button click={handleBack} text="BACK" sound="back" active={false} />
    </div>
  );
}
