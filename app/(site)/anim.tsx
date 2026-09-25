"use client";

import { ReactNode, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { motion, useInView } from "framer-motion";
import { RoughNotation } from "react-rough-notation";

/** Flowy 3D tilt: the card glides toward the cursor with momentum (fabric-like). */
export function TiltCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const s = useRef({ rx: 0, ry: 0, sc: 1, tx: 0, ty: 0, ts: 1, raf: 0, active: false });

  useEffect(() => {
    const st = s.current;
    const loop = () => {
      const k = 0.08; // low = more glide / fabric flow
      st.rx += (st.tx - st.rx) * k;
      st.ry += (st.ty - st.ry) * k;
      st.sc += (st.ts - st.sc) * k;
      if (ref.current) {
        ref.current.style.transform = `perspective(1100px) rotateY(${st.rx.toFixed(3)}deg) rotateX(${st.ry.toFixed(3)}deg) scale(${st.sc.toFixed(4)})`;
      }
      const settled =
        Math.abs(st.tx - st.rx) < 0.01 &&
        Math.abs(st.ty - st.ry) < 0.01 &&
        Math.abs(st.ts - st.sc) < 0.001;
      if (!st.active && settled) {
        st.raf = 0;
        return;
      }
      st.raf = requestAnimationFrame(loop);
    };
    const kick = () => {
      if (!st.raf) st.raf = requestAnimationFrame(loop);
    };
    (ref.current as HTMLDivElement & { _kick?: () => void })._kick = kick;
    return () => {
      if (st.raf) cancelAnimationFrame(st.raf);
    };
  }, []);

  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    const st = s.current;
    st.tx = px * 6;
    st.ty = -py * 6;
    st.ts = 1.035;
    st.active = true;
    (el as HTMLDivElement & { _kick?: () => void })._kick?.();
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    const st = s.current;
    st.tx = 0;
    st.ty = 0;
    st.ts = 1;
    st.active = false;
    (el as HTMLDivElement & { _kick?: () => void })._kick?.();
  };

  return (
    <div ref={ref} className="tilt" onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

/** Image-unveil: scales the cover down as it scrolls into view. */
export function Cover({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="tcard-cover-reveal"
      aria-hidden="true"
      initial={{ scale: 1.28 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

type AnnotationType = "underline" | "box" | "circle" | "highlight" | "strike-through" | "crossed-off" | "bracket";

/** Fade + slide up as the block scrolls into view. */
export function Reveal({
  children,
  y = 24,
  delay = 0,
}: {
  children: ReactNode;
  y?: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Hand-drawn (rough.js) annotation that draws itself in on view. */
export function Annotate({
  children,
  color = "#f2a51c",
  type = "underline",
  strokeWidth = 2.5,
}: {
  children: ReactNode;
  color?: string;
  type?: AnnotationType;
  strokeWidth?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });
  // Wait for the (serif) webfont to load so rough-notation measures the final
  // text width and draws the underline in the right place.
  const [fontsReady, setFontsReady] = useState(false);
  useEffect(() => {
    let alive = true;
    const done = () => alive && setFontsReady(true);
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    if (fonts?.ready) fonts.ready.then(done).catch(done);
    else done();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <span ref={ref} style={{ display: "inline" }}>
      <RoughNotation
        type={type}
        show={inView && fontsReady}
        color={color}
        strokeWidth={strokeWidth}
        animationDuration={800}
        padding={2}
        iterations={2}
        multiline
      >
        {children}
      </RoughNotation>
    </span>
  );
}
