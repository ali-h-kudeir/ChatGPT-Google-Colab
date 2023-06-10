import { useEffect, useRef, useState } from 'react';

const useDynamicMaxHeight = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | null>(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateMaxHeight = () => {
      const height = element.scrollHeight;
      setContentHeight(height);
    };

    updateMaxHeight();

    // Re-calculate max height when the content changes
    const observer = new MutationObserver(updateMaxHeight);
    observer.observe(element, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref, contentHeight };
};

export default useDynamicMaxHeight;
