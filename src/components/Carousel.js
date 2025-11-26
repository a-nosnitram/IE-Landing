import React, { useMemo, useState } from "react";
import "./Carousel.css";

const carItems = [
  {
    id: "character-1",
    title: "Эарендель Левайятан",
    description: "новый Император, основатель учёного ордена «Утренняя звезда»",
    image: `${process.env.PUBLIC_URL}/assets/car1.png`,
  },
  {
    id: "character-2",
    title: "самаэль Левайятан",
    description: "Безумный принц, на чьих идеях основан культ Деяний",
    image: `${process.env.PUBLIC_URL}/assets/car2.png`,
  },
  {
    id: "character-3",
    title: "Дэйлила гарднемс",
    description: "Журналистка,автор блога «Завистливая Сплетница»",
    image: `${process.env.PUBLIC_URL}/assets/car3.png`,
  },
  {
    id: "character-4",
    title: "фэмер кёр",
    description: "Следователь из подразделения Грёз O Контакте, пироман",
    image: `${process.env.PUBLIC_URL}/assets/car4.jpg`,
  },
  {
    id: "character-5",
    title: "ан крайц",
    description: "«Жемчужная герцогиня», глава подразделения Грёз O Чуде",
    image: `${process.env.PUBLIC_URL}/assets/car5.jpg`,
  },
  {
    id: "character-6",
    title: "наф",
    description: "хозяйка императорского ритуального бюро «а-эйдос»",
    image: `${process.env.PUBLIC_URL}/assets/car6.jpg`,
  },
  {
    id: "character-7",
    title: "шимиан и уайт",
    description: "Великая императорская чета, «Царственные тьма и свет»",
    image: `${process.env.PUBLIC_URL}/assets/shimian-and-white.jpeg`,
  },
  {
    id: "character-8",
    title: "сияние",
    description: "Глава организации «Грёзы», сильнейшая обладательница Ками",
    image: `${process.env.PUBLIC_URL}/assets/car8.png`,
  },
];

export default function CharacterCarousel() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(null);
  const [run, setRun] = useState(false);
  const [entering, setEntering] = useState(false);

  const n = carItems.length;
  const centerIdx = current;
  const leftIdx = (current - 1 + n) % n;
  const rightIdx = (current + 1) % n;

  const goRight = () => {
    if (dir) return;
    setDir("right");
    setEntering(false);
    // kick off the CSS transition in next frame
    requestAnimationFrame(() => setRun(true));
    setTimeout(() => {
      setCurrent((c) => (c + 1) % n);
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
      setCurrent((c) => (c - 1 + n) % n);
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

    // include a ghost element coming from the direction of motion
    if (dir === "right") {
      const nextRight = (rightIdx + 1) % n;
      base.push({
        key: `G-R-${carItems[nextRight].id}`,
        idx: nextRight,
        slot: "ghost-enter-right",
      });
    } else if (dir === "left") {
      const prevLeft = (leftIdx - 1 + n) % n;
      base.push({
        key: `G-L-${carItems[prevLeft].id}`,
        idx: prevLeft,
        slot: "ghost-enter-left",
      });
    }
    return base;
  }, [dir, leftIdx, centerIdx, rightIdx]);

  const getClass = (slot) => {
    if (!dir) return slotClass[slot].atRest;

    if (dir === "left") {
      if (!run) return slotClassLeft.start[slot];
      return slotClassLeft.end[slot];
    } else {
      if (!run) return slotClassRight.start[slot];
      return slotClassRight.end[slot];
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
    "ghost-enter-right": "off-right",
  },
  end: {
    left: "to-off-left",
    center: "to-left",
    right: "to-center",
    "ghost-enter-right": "to-right",
  },
};

const slotClassLeft = {
  start: {
    left: "pos-left",
    center: "pos-center",
    right: "pos-right",
    "ghost-enter-left": "off-left",
  },
  end: {
    left: "to-center",
    center: "to-right",
    right: "to-off-right",
    "ghost-enter-left": "to-left",
  },
};
