import { useState } from "preact/hooks";
import Button from "../Button";
import AddWebsiteForm from "./AddWebsiteForm";
import RemoveWebsiteList from "./RemoveWebsiteList";

interface SettingsMenuProps {
  toggleSettings: () => void;
}

export default function SettingsMenu({ toggleSettings }: SettingsMenuProps) {
  function handleBack() {
    toggleSettings();
    window.location.reload();
  }

  return (
    <div class={"z-1 relative grid gap-12 p-12 w-full"}>
      {/* <section>
        <h1 class={"font-beckett text-[#9ec8ed] text-5xl mb-2"}>
          Sound Effects
        </h1>
        <Button text="TODO" />
      </section> */}
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
      <Button onClick={handleBack} text="BACK" active={false} />
    </div>
  );
}
