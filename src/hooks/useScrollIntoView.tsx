import { useEffect, useRef } from "react";

function useScrollIntoView(distance: number ) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) {
      return;
    }
    elementRef.current.scrollBy({ top: distance, left: 0, behavior: "smooth" });
  }, [distance]);
  return elementRef;
}

export default useScrollIntoView;
