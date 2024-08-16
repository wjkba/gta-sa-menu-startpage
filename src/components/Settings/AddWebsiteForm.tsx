import { useRef, useState } from "preact/hooks";
import Button from "../Button";
import { db } from "../../db";

export default function AddWebsiteForm() {
  const [message, setMessage] = useState<null | string>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const linkRef = useRef<HTMLInputElement | null>(null);

  async function handleFormSubmit(event: Event) {
    event.preventDefault();
    console.log(nameRef.current?.value, linkRef.current?.value);
    try {
      if (nameRef.current && linkRef.current) {
        if (
          nameRef.current.value.length > 1 &&
          linkRef.current.value.length > 1
        ) {
          const result = await db.websites.add({
            name: nameRef.current.value,
            link: linkRef.current.value,
          });

          setMessage("website added successfully");
        } else throw new Error("Wrong input");
      } else throw new Error("Wrong input");
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
      <Button type={"submit"} text="Add" />
    </form>
  );
}
