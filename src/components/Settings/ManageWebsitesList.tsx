import { Website } from "../../db";
import ButtonWebsiteManage from "./ButtonWebsiteManage";

interface ManageWebsitesListProps {
  sites: Website[];
  refreshDatabase: () => void;
}

export default function ManageWebsitesList({
  sites,
  refreshDatabase,
}: ManageWebsitesListProps) {
  return (
    <div class={"grid gap-2"}>
      {sites.map((site) => (
        <ButtonWebsiteManage
          key={site.id}
          name={site.name}
          link={site.link}
          websiteId={site.id}
          refreshDatabase={refreshDatabase}
        />
      ))}
    </div>
  );
}
