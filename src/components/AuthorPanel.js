import React, { forwardRef, useEffect } from "react";
import "./AuthorPanel.css";

const AuthorPanel = forwardRef(function AuthorPanel(props, ref) {
  // ref forwarded to the section DOM node so parent can toggle `.open`

  useEffect(() => {
    const root = ref && ref.current ? ref.current : null;
    if (!root) return;

    // IntersectionObserver: add .in-view when grid items enter the panel viewport
    const items = Array.from(root.querySelectorAll(".author-grid .grid-item"));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      {
        root,
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.08,
      }
    );
    items.forEach((it) => obs.observe(it));

    // MutationObserver: watch for removal of `.open` so we can reset reveal state
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes" && m.attributeName === "class") {
          const hasOpen = root.classList.contains("open");
          if (!hasOpen) {
            const items = root.querySelectorAll(".author-grid .grid-item");
            items.forEach((i) => i.classList.remove("in-view"));
          }
        }
      }
    });
    mo.observe(root, { attributes: true });

    return () => {
      obs.disconnect();
      mo.disconnect();
    };
  }, [ref]);

  return (
    <section className="section-author" ref={ref} aria-hidden="true">
      <div className="author-grid">
        {/* Row 1: picture | text */}
        <div className="grid-item grid-pic">
          <img
            src={`${process.env.PUBLIC_URL}/assets/wk1.png`}
            alt="Author portrait left"
            className="author-photo-large"
          />
        </div>
        <div className="grid-item grid-text">
          <h1 className="author-name">Ксения W Маничевская</h1>
          <h3 className="author-sub">Писатель, актриса, мистик</h3>

          <h4>Автор фэнтези‑трилогии «Исповедь Шимиан»</h4>
          <ul className="author-list">
            <li>
              Победитель Всероссийского литературного детско‑юношеского конкурса
              «Проба пера» и Всероссийского конкурса литературного творчества
              «Крылья», опубликован рассказ в конкурсном сборнике, 2021 год
            </li>
            <li>
              Полуфиналистка 9 набора питчингов бюро «Литагенты существуют"
            </li>
            <li>
              Опубликована глава с авторскими стихотворениями в сборнике «Между
              дублями. Поэзия, проза…», 2022 год
            </li>
          </ul>
        </div>

        {/* Row 2: text | picture */}
        <div className="grid-item grid-text">
          <h4>Актриса, снявшаяся в 15+ проектах</h4>
          <ul className="author-list">
            <li>Приз за лучшую женскую роль в фильме «Бог есть»</li>
            <li>
              Главная роль на английском языке в международном фильме «S.O.S.»
            </li>
            <li>
              Приглашение на международный китайский кинофестиваль «Золотой
              петух и сто цветов», 2023
            </li>
          </ul>
          <h4>Мастер настольных ролевых игр с 2023 года</h4>
          <ul className="author-list">
            <li>«Dungeons & Dragons»</li>
            <li>«Delta Green»</li>
          </ul>
        </div>
        <div className="grid-item grid-pic">
          <img
            src={`${process.env.PUBLIC_URL}/assets/kw2.png`}
            alt="Author portrait right"
            className="author-photo-small"
          />
        </div>

        {/* Row 3: picture | text */}
        <div className="grid-item grid-pic">
          <img
            src={`${process.env.PUBLIC_URL}/assets/kwm-3.png`}
            alt="Author portrait left repeat"
            className="author-photo-large"
          />
        </div>
        <div className="grid-item grid-text">
          <div className="author-notes">
            <h4>СТУДЕНТКА НИУ «ВШЭ»</h4>
            <ul className="author-list">
              <li>
                Золотая медалистка, окончила школу экстерном (10-11 классы за 1
                год)
              </li>
              <li>Факультет развития креативных индустрий</li>
              <li>
                Образовательная программа «Управление в креативных индустриях»
              </li>
            </ul>

            <h4>ГОРОДСКАЯ ВЕДЬМА И МИСТИК</h4>
            <ul className="author-list">
              <li>Знак зодиака - Весы</li>
              <li>Аркан Таро - (9) Отшельник</li>
              <li>Практик осознанных сновидений с 2017 года</li>
            </ul>

            <h4>ТОП-1% ИГРОК «GENSHIN IMPACT» ПО КОЛИЧЕСТВУ ДОСТИЖЕНИЙ</h4>
          </div>
        </div>
      </div>

      <footer className="author-footer">
        <div className="author-footer-grid">
          <div className="footer-col footer-email">
            <div className="footer-label">По вопросам сотрудничества</div>
            <a href="mailto:kwmanich@gmail.com" className="footer-link">
              kwmanich@gmail.com
            </a>
          </div>

          <div className="footer-col footer-tg">
            <div className="footer-label">Обратная связь</div>
            <a
              href="https://t.me/kwmanich"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              @kwmanich
            </a>
          </div>

          <div className="footer-col footer-kino">
            <div className="footer-label">Кино</div>
            <a
              href="https://www.kinopoisk.ru/name/4544191/?utm_referrer=organic.kinopoisk.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-kino-link"
            >
              <img
                src={`${process.env.PUBLIC_URL}/assets/kino.png`}
                alt="Kinopoisk"
                className="kino-logo"
              />
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
});

export default AuthorPanel;
