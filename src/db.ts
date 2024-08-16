import Dexie, { EntityTable } from "dexie";

const initWebsites = [
  { name: "NOTION", link: "https://www.notion.so" },
  { name: "CODEWARS", link: "https://www.codewars.com" },
  { name: "GITHUB", link: "https://www.github.com" },
  { name: "YOUTUBE", link: "https://www.youtube.com" },
  { name: "MDN", link: "https://developer.mozilla.org" },
  { name: "DISCORD", link: "https://www.discord.com" },
];

interface Website {
  id: number;
  name: string;
  link: string;
}

const db = new Dexie("WebsitesDatabase") as Dexie & {
  websites: EntityTable<Website, "id">;
};

db.version(1).stores({ websites: "++id, name, link" });

export type { Website };
export { db };

export async function initDb() {
  try {
    await db.open();
    const count = await db.websites.count();
    if (count > 0) return;
    for (let website of initWebsites) {
      await db.websites.add(website);
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getDbArray() {
  try {
    await db.open();
    const dbArray = await db.websites.toArray();
    return dbArray;
  } catch (error) {
    console.error(error);
  }
}
