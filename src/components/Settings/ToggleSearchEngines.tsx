import { useEffect } from "preact/hooks";
import Button from "../Button";

interface ToggleSearchEnginesProps {
  searchEngines: string[];
  setSearchEngines: (searchEngines: string[]) => void;
}

export default function ToggleSearchEngines({
  searchEngines,
  setSearchEngines,
}: ToggleSearchEnginesProps) {
  let availableEngines = ["google", "duck", "youtube"];

  useEffect(() => {
    console.log(searchEngines);
  }, [searchEngines]);

  function handleToggle(engine: string) {
    if (searchEngines.includes(engine)) {
      const updatedEngines = searchEngines.filter((item) => item !== engine);
      setSearchEngines(updatedEngines);
      localStorage.setItem("searchEngines", JSON.stringify(updatedEngines));
    } else {
      const updatedEngines = [...searchEngines, engine];
      updatedEngines.sort(
        (a, b) => availableEngines.indexOf(a) - availableEngines.indexOf(b)
      );
      setSearchEngines(updatedEngines);
      localStorage.setItem("searchEngines", JSON.stringify(updatedEngines));
    }
  }

  return (
    <div>
      {availableEngines.map((engine) => (
        <div class={"flex justify-between"}>
          <Button
            click={() => handleToggle(engine)}
            className="w-full "
            text={engine}
          />
          <Button
            disabled
            text={searchEngines.includes(engine) ? "ON" : "OFF"}
          />
        </div>
      ))}
    </div>
  );
}
