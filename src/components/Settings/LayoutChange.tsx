import { useEffect, useState } from "preact/hooks";
import oneColumnActive from "../../assets/icons/oneColumn--active.svg";
import twoColumnsActive from "../../assets/icons/twoColumns--active.svg";
import oneColumnInactive from "../../assets/icons/oneColumn--inactive.svg";
import twoColumnsInactive from "../../assets/icons/twoColumns--inactive.svg";
import { playSound } from "../../utils/audioUtils";

export default function LayoutChange() {
  const [layout, setLayout] = useState("oneColumn");

  useEffect(() => {
    const localLayout = localStorage.getItem("layout");
    if (localLayout) setLayout(localLayout);
  }, []);

  function OneColumnIcon() {
    if (layout === "oneColumn")
      return <img src={oneColumnActive} alt="One Column Active" />;
    else return <img src={oneColumnInactive} alt="One Column Inactive" />;
  }

  function TwoColumnsIcon() {
    if (layout === "twoColumns")
      return <img src={twoColumnsActive} alt="Two Columns Active" />;
    else return <img src={twoColumnsInactive} alt="Two Columns Inactive" />;
  }

  function handleLayoutChange(layout: string) {
    if (layout === "twoColumns") {
      localStorage.setItem("layout", "twoColumns");
      setLayout("twoColumns");
    } else {
      localStorage.setItem("layout", "oneColumn");
      setLayout("oneColumn");
    }
    playSound("enter");
  }

  return (
    <div>
      <div class={"flex gap-2"}>
        <button
          class={"max-w-[4rem]"}
          onClick={() => handleLayoutChange("oneColumn")}
        >
          <OneColumnIcon />
        </button>
        <button
          class={"max-w-[4rem]"}
          onClick={() => handleLayoutChange("twoColumns")}
        >
          <TwoColumnsIcon />
        </button>
      </div>
    </div>
  );
}
