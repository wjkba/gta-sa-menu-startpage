import { useEffect, useState } from "preact/hooks";
import Button from "../Button";

const volumeSettings = [
  "0.1",
  "0.2",
  "0.3",
  "0.4",
  "0.5",
  "0.6",
  "0.7",
  "0.8",
  "0.9",
  "1.0",
];

export default function VolumeSetting() {
  const [activeVolume, setActiveVolume] = useState(9);

  useEffect(() => {
    let volumeStorage = localStorage.getItem("volume");
    if (volumeStorage) {
      let settingIndex = volumeSettings.findIndex((i) => i === volumeStorage);
      setActiveVolume(settingIndex);
    } else {
      setActiveVolume(9);
      localStorage.setItem("volume", "1.0");
    }
  }, []);

  function changeVolume() {
    setActiveVolume((prevVolume) => {
      const newVolume =
        prevVolume < volumeSettings.length - 1 ? prevVolume + 1 : 0;
      localStorage.setItem("volume", volumeSettings[newVolume]);
      return newVolume;
    });
  }

  return (
    <Button
      click={changeVolume}
      text={`VOLUME: ${volumeSettings[activeVolume]}`}
    />
  );
}
