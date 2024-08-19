import { JSX } from "preact/jsx-runtime";
import { useState } from "preact/hooks";

const searchPlaceholder = {
  google: "search Google",
  duck: "search Duckduckgo",
  youtube: "search Youtube",
};

export type SearchEngines = "google" | "duck" | "youtube";

interface SearchBarProps {
  search: SearchEngines;
  setIsSearchBarActive: (bool: boolean) => void;
}
export default function SearchBar({
  search,
  setIsSearchBarActive,
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  function handleSubmit(event: Event) {
    event.preventDefault();
    const query = searchQuery.split(" ").join("+");
    setSearchQuery("");
    switch (search) {
      case "google":
        window.location.href = `https://www.google.com/search?q=${query}`;
        break;
      case "duck":
        window.location.href = `https://duckduckgo.com/?t=h_&q=${query}`;
        break;
      case "youtube":
        window.location.href = `https://www.youtube.com/results?search_query=${query}`;
        break;
      default:
        return;
    }

    console.log(searchQuery);
  }

  function handleChange(event: JSX.TargetedEvent<HTMLInputElement, Event>) {
    setSearchQuery(event.currentTarget.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        class={`mb-2 text-white relative z-1 outline-none bg-neutral-800 p-2 text-left font-bankGothic text-2xl font-medium w-full`}
        placeholder={searchPlaceholder[search]}
        onChange={handleChange}
        value={searchQuery}
        onFocus={() => setIsSearchBarActive(true)}
        onBlur={() => setIsSearchBarActive(false)}
      />
    </form>
  );
}
