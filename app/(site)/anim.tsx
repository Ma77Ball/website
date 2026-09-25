"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { RoughNotation } from "react-rough-notation";

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
  return (
    <span ref={ref} style={{ display: "inline" }}>
      <RoughNotation
        type={type}
        show={inView}
        color={color}
        strokeWidth={strokeWidth}
        animationDuration={800}
        padding={3}
        iterations={2}
      >
        {children}
      </RoughNotation>
    </span>
  );
}
