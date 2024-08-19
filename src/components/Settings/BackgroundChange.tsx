import Button from "../Button";

const backgrounds = ["bg1", "bg2", "bg3", "bg4", "bg5", "bg6"];

interface BackgroundChangeProps {
  currentBackground: string;
  setCurrentBackground: (bgX: string) => void;
}

export default function BackgroundChange({
  currentBackground,
  setCurrentBackground,
}: BackgroundChangeProps) {
  function handleChange(bg: string) {
    localStorage.setItem("background", bg);
    setCurrentBackground(bg);
  }

  return (
    <div class={"flex flex-wrap"}>
      {backgrounds.map((bg, index) => (
        <Button
          className={"px-4"}
          active={currentBackground === bg}
          click={() => handleChange(bg)}
          text={String(index + 1)}
        />
      ))}
      <p></p>
    </div>
  );
}
