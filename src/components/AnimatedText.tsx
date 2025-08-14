"use client";

import { motion, AnimatePresence } from "framer-motion";

interface AnimatedTextProps {
  text: string;
}

const letterVariant = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const containerVariant = {
  animate: {
    transition: { staggerChildren: 0.05 },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export default function AnimatedText({ text }: AnimatedTextProps) {
  // Split the text into an array of letters (preserving spaces)
  const letters = text.split("");

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={text}
        className="flex"
        variants={containerVariant}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {letters.map((letter, index) => (
          <motion.span key={index} variants={letterVariant}>
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
