import { useRef, useState } from "preact/hooks";
import Button from "../Button";
import { db } from "../../db";

interface AddWebsiteFormProps {
  refreshDatabase: () => void;
}

export default function AddWebsiteForm({
  refreshDatabase,
}: AddWebsiteFormProps) {
  const [message, setMessage] = useState<null | string>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const linkRef = useRef<HTMLInputElement | null>(null);

  async function handleFormSubmit(event: Event) {
    event.preventDefault();

    const name = nameRef.current?.value.toUpperCase();
    const link = linkRef.current?.value.toUpperCase();

    console.log(name, link);

    if (!name || !link || name.length <= 1 || link.length <= 1) {
      setMessage("Wrong input");
      return;
    }

    try {
      await db.websites.add({ name, link });
      if (nameRef.current) nameRef.current.value = "";
      if (linkRef.current) linkRef.current.value = "";
      setMessage("Website added successfully");
      refreshDatabase();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        setMessage("Error: " + error.message);
      } else {
        console.error("An unknown error occurred");
        setMessage("An unknown error occurred");
      }
    }
  }

  return (
    <form onSubmit={handleFormSubmit} class={"max-w-[600px]"}>
      <div class={"mb-2"}>
        <input
          ref={nameRef}
          class={`mb-2 text-white outline-none bg-neutral-800 p-2 text-left font-bankGothic text-2xl font-medium w-full`}
          placeholder={"website name"}
        />
        <input
          ref={linkRef}
          class={`mb-2 text-white outline-none bg-neutral-800 p-2 text-left font-bankGothic text-2xl font-medium w-full`}
          placeholder={"link"}
        />
        {message && <p class={"text-yellow-300"}>{message}</p>}
      </div>

      <Button type={"submit"} text="Add" />
    </form>
  );
}
