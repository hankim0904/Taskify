import { useEffect } from "react";

export function useIntersectionObserver(
  observerRef: React.RefObject<HTMLDivElement | null>,
  fetchContent: () => void,
  options: IntersectionObserverInit
) {
  useEffect(() => {
    if (observerRef.current === null) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchContent();
      }
    }, options);

    const currentBottomObserver = observerRef.current;
    observer.observe(currentBottomObserver);

    return () => observer.unobserve(currentBottomObserver);
  }, [observerRef, fetchContent, options]);
}
