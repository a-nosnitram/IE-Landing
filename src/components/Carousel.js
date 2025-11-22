import React, { useMemo, useState } from "react";
import "./Carousel.css";

const carItems = [
  {
    id: "character-1",
    title: "Аренда",
    description: "блаблаблаблаблаблабла балалулав вовррв ры ырытфымвоппы ывм.",
    image: `${process.env.PUBLIC_URL}/assets/car1.png`,
  },
  {
    id: "character-2",
    title: "Самаэль",
    description: " арвп вагврв рыви ыввну варвиа.",
    image: `${process.env.PUBLIC_URL}/assets/car2.png`,
  },
  {
    id: "character-3",
    title: "Дейлила",
    description: "гага у ля ля ра ма ра ма ма-а га га у ла ла тара бэд ромэнс",
    image: `${process.env.PUBLIC_URL}/assets/car3.png`,
  },
];

export default function CharacterCarousel() {
  const [current, setCurrent] = useState(1);
  const [dir, setDir] = useState(null);
  const [run, setRun] = useState(false);
  const [entering, setEntering] = useState(false);

  const rightIdx = (current + carItems.length - 1) % carItems.length;
  const centerIdx = current;
  const leftIdx = (current + 1) % carItems.length;

  const goRight = () => {
    if (dir) return;
    setDir("right");
    setEntering(false);
    requestAnimationFrame(() => setRun(true));
    setTimeout(() => {
      setCurrent(rightIdx);
      setDir(null);
      setRun(false);
      setEntering(true);
      setTimeout(() => setEntering(false), 400);
    }, 600);
  };

  const goLeft = () => {
    if (dir) return;
    setDir("left");
    setEntering(false);
    requestAnimationFrame(() => setRun(true));
    setTimeout(() => {
      setCurrent(leftIdx);
      setDir(null);
      setRun(false);
      setEntering(true);
      setTimeout(() => setEntering(false), 400);
    }, 600);
  };

  const items = useMemo(() => {
    const base = [
      { key: `L-${carItems[leftIdx].id}`, idx: leftIdx, slot: "left" },
      { key: `C-${carItems[centerIdx].id}`, idx: centerIdx, slot: "center" },
      { key: `R-${carItems[rightIdx].id}`, idx: rightIdx, slot: "right" },
    ];

    if (dir === "left") {
      base.push({
        key: `G-R-${carItems[leftIdx].id}`,
        idx: rightIdx,
        slot: "ghost-enter-left",
      });
    } else if (dir === "right") {
      base.push({
        key: `G-L-${carItems[rightIdx].id}`,
        idx: leftIdx,
        slot: "ghost-enter-right",
      });
    }
    return base;
  }, [dir, leftIdx, centerIdx, rightIdx]);

  const getClass = (slot) => {
    if (!dir) return slotClass[slot].atRest;

    if (dir === "left") {
      if (!run) return slotClassRight.start[slot];
      return slotClassRight.end[slot];
    } else {
      // dir === 'left'
      if (!run) return slotClassLeft.start[slot];
      return slotClassLeft.end[slot];
    }
  };

  return (
    <div className="character-carousel">
      <div className="carousel-container">
        <button
          className="carousel-arrow left"
          onClick={goLeft}
          disabled={!!dir}
        >
          <svg width="4vw" height="4vw" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="carousel-items">
          {items.map(({ key, idx, slot }) => (
            <div key={key} className={`carousel-item ${getClass(slot)}`}>
              <div className="character-card">
                {carItems[idx].image ? (
                  <img
                    src={carItems[idx].image}
                    alt={carItems[idx].title}
                    className="character-image"
                  />
                ) : (
                  <h3>{carItems[idx].title}</h3>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-arrow right"
          onClick={goRight}
          disabled={!!dir}
        >
          <svg width="4vw" height="4vw" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div
        className={`carousel-description ${dir ? "transitioning" : ""} ${
          entering ? "entering" : ""
        }`}
        key={current}
      >
        <h4>{carItems[current].title}</h4>
        <p>{carItems[current].description}</p>
      </div>
    </div>
  );
}

const slotClass = {
  left: { atRest: "pos-left" },
  center: { atRest: "pos-center" },
  right: { atRest: "pos-right" },
  "ghost-enter-left": { atRest: "off-left" },
  "ghost-enter-right": { atRest: "off-right" },
};

const slotClassRight = {
  start: {
    left: "pos-left",
    center: "pos-center",
    right: "pos-right",
    "ghost-enter-left": "off-left", // ghost starts off-screen left
  },
  end: {
    left: "to-center",
    center: "to-right",
    right: "to-off-right",
    "ghost-enter-left": "to-left",
  },
};

const slotClassLeft = {
  // When clicking LEFT: everything moves to the LEFT.
  start: {
    left: "pos-left",
    center: "pos-center",
    right: "pos-right",
    "ghost-enter-right": "off-right",
  },
  end: {
    left: "to-off-left",
    center: "to-left",
    right: "to-center",
    "ghost-enter-right": "to-right",
  },
};
