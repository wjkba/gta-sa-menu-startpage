import { useEffect, useState } from "preact/hooks";
import { db, getDbArray, Website } from "../../db";
import Button from "../Button";

export default function RemoveWebsiteList() {
  const [sites, setSites] = useState<[] | Website[]>([]);

  useEffect(() => {
    async function getWebsites() {
      const fetchedArray = await getDbArray();
      if (fetchedArray) setSites(fetchedArray);
    }
    getWebsites();
  }, []);

  async function handleDelete(site: Website) {
    try {
      await db.websites.delete(site.id);
      setSites((sites) => sites.filter((website) => website.id !== site.id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div class={"grid gap-2"}>
      {sites.map((site) => (
        <Button
          class={"bg-red-300"}
          onClick={() => handleDelete(site)}
          text={site.name}
        />
      ))}
    </div>
  );
}
