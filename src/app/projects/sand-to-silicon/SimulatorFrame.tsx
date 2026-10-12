'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Props = { src?: string; title?: string };

export default function SimulatorFrame({
  src = '/sand-to-silicon.html',
  title = 'Sand to Silicon chip-making simulator',
}: Props) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(1400);

  const measure = useCallback(() => {
    const wrap = frameRef.current?.contentDocument?.querySelector('.wrap');
    if (wrap) {
      setHeight(Math.max(700, Math.ceil(wrap.getBoundingClientRect().height) + 90));
    }
  }, []);

  useEffect(() => {
    const id = setInterval(measure, 500);
    return () => clearInterval(id);
  }, [measure]);

  return (
    <iframe
      ref={frameRef}
      src={src}
      title={title}
      onLoad={measure}
      scrolling="no"
      style={{ height }}
      className="w-full block border-0"
    />
  );
}
