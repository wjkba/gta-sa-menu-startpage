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
    <div class={"z-1 relative flex flex-col gap-2 p-12 w-full"}>
      <section class={"mb-4"}>
        <h1 class={"text-white text-4xl mb-2"}>Add new website</h1>
        <AddWebsiteForm />
      </section>

      <section class={"mb-16"}>
        <h1 class={"text-white text-4xl mb-2"}>Remove websites</h1>
        <RemoveWebsiteList />
      </section>

      <Button onClick={handleBack} text="BACK" active={false} />
    </div>
  );
}
