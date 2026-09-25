"use client";

import { useState } from "react";
import { EDUCATION } from "./content";

export function Education() {
  const [open, setOpen] = useState(0);

  return (
    <div className="edu">
      {EDUCATION.map((e, i) => {
        const isOpen = open === i;
        return (
          <button
            key={e.school}
            type="button"
            className={`edu-item${isOpen ? " open" : ""}`}
            style={{ "--edu-accent": e.accent } as React.CSSProperties}
            onClick={() => setOpen(isOpen ? -1 : i)}
            aria-expanded={isOpen}
          >
            <img className="edu-logo" src={`/logos/${e.logo}.svg`} alt={e.school} width={56} height={56} />
            <div className="edu-body">
              <div className="edu-row">
                <span className="edu-school">{e.school}</span>
                <span className="edu-period">{e.period}</span>
              </div>
              <div className="edu-degree">{e.degree}</div>
              <div className="edu-detail-wrap">
                <p className="edu-detail">{e.detail}</p>
              </div>
            </div>
            <span className="edu-chevron" aria-hidden="true">
              {isOpen ? "–" : "+"}
            </span>
          </button>
        );
      })}
    </div>
  );
}
