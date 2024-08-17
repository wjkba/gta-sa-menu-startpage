import { db, Website } from "../../db";
import Button from "../Button";

interface RemoveWebsiteListProps {
  sites: Website[];
  refreshDatabase: () => void;
}

export default function RemoveWebsiteList({
  sites,
  refreshDatabase,
}: RemoveWebsiteListProps) {
  async function handleDelete(site: Website) {
    try {
      await db.websites.delete(site.id);
      refreshDatabase();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div class={"grid gap-2"}>
      {sites.map((site) => (
        <Button click={() => handleDelete(site)} text={"X " + site.name} />
      ))}
    </div>
  );
}
