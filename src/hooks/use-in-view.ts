import { useEffect, useState, useRef } from "react";

export function useInView({ threshold = 0.1 }: { threshold: number | number[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [hasLeft, setHasLeft] = useState(false);
  const [visibility, setVisibility] = useState(0); // New: Tracks intersection ratio

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        setVisibility(entry.intersectionRatio); // Track ratio
        if (!entry.isIntersecting) setHasLeft(true);
      },
      { threshold }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView, hasLeft, visibility] as const;
}
