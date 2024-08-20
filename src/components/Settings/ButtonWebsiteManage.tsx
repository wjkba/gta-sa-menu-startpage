import { useState } from "preact/hooks";
import { playSound } from "../../utils/audioUtils";
import Button from "../Button";
import { db } from "../../db";

interface ButtonWebsiteManageProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  link: string;
  websiteId: number;
  sound?: string;
  className?: string;
  refreshDatabase: () => void;
}

export default function ButtonWebsiteManage({
  name,
  link,
  websiteId,
  sound = "enter",
  className,
  refreshDatabase,
  ...rest
}: ButtonWebsiteManageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editLink, setEditLink] = useState(link);

  function handleClick() {
    const soundEnabled = localStorage.getItem("soundEnabled") !== "false";
    if (!soundEnabled) setIsEditing(true);
    else {
      playSound("enter");
      setIsEditing(true);
    }
  }

  function handleNameChange(event: Event) {
    const target = event.target as HTMLInputElement;
    setEditName(target.value);
  }

  function handleLinkChange(event: Event) {
    const target = event.target as HTMLInputElement;
    setEditLink(target.value);
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();
    const soundEnabled = localStorage.getItem("soundEnabled") !== "false";
    if (soundEnabled) playSound("enter");
    try {
      await db.websites.update(websiteId, {
        name: editName.toUpperCase(),
        link: editLink,
      });
      refreshDatabase();
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete() {
    try {
      await db.websites.delete(websiteId);
      refreshDatabase();
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  }

  if (isEditing) {
    return (
      <form
        onSubmit={handleSubmit}
        class={"border-2 border-[#4b5b6a] p-4 text-white"}
      >
        <label>
          name:
          <input
            class={`mb-2 text-white outline-none bg-neutral-800 p-2 text-left   md:text-2xl text-lg font-medium w-full`}
            placeholder={"name"}
            value={editName}
            onChange={handleNameChange}
          />
        </label>
        <label>
          link:
          <input
            class={`mb-2 text-white outline-none bg-neutral-800 p-2 text-left  md:text-2xl text-lg font-medium w-full`}
            placeholder={"name"}
            value={editLink}
            onChange={handleLinkChange}
          />
        </label>
        <div class={"flex flex-wrap gap-4 justify-between mt-4"}>
          <Button type={"submit"} text="UPDATE" />
          <Button
            click={handleDelete}
            sound="back"
            type={"button"}
            text="DELETE"
          />
        </div>
      </form>
    );
  }

  return (
    <button
      {...rest}
      onClick={handleClick}
      class={`${className} text-[#4b5b6a] hover:text-[#a8c3e7] text-left  font-bankGothic md:text-3xl text-2xl font-medium`}
    >
      {name}
    </button>
  );
}
