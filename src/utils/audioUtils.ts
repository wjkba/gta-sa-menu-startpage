import selectSFX from "../assets/audio/select.mp3";
import enterSFX from "../assets/audio/enter.mp3";
import backSFX from "../assets/audio/back.mp3";

export function playSound(soundName: string) {
  let audio;
  let volume = 1.0;
  let volumeStorage = localStorage.getItem("volume");
  if (volumeStorage) volume = parseFloat(volumeStorage);
  else localStorage.setItem("volume", "1.0");

  switch (soundName) {
    case "select":
      audio = new Audio(selectSFX);
      break;
    case "enter":
      audio = new Audio(enterSFX);
      break;
    case "back":
      audio = new Audio(backSFX);
      break;
    default:
      break;
  }
  if (audio) {
    audio.volume = volume;
    audio.play();
  }
}

export function playSoundDelay(
  soundName: string,
  action = () => {},
  delay = 200
) {
  playSound(soundName);
  setTimeout(() => {
    action();
  }, delay);
}
