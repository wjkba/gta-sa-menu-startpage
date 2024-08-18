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
    <div class={"flex flex-wrap gap-4"}>
      {backgrounds.map((bg, index) => (
        <Button
          active={currentBackground === bg}
          click={() => handleChange(bg)}
          text={String(index + 1)}
        />
      ))}
      <p></p>
    </div>
  );
}
