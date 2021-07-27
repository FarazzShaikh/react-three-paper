import React, { useEffect, useRef } from "react";

interface iPaperPropTypes {
  script: (canvas?: HTMLCanvasElement) => Promise<(time?: number) => void>;
  style?: React.CSSProperties;
}

export function Paper({ script, style }: iPaperPropTypes) {
  const ref = useRef(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    script(ref.current).then((callback) => {
      let ID: number;
      function animate(time: number) {
        callback(time);
        ID = requestAnimationFrame(animate);
      }

      observer = new IntersectionObserver(([{ isIntersecting }]) => {
        if (!isIntersecting) {
          cancelAnimationFrame(ID);
        } else {
          requestAnimationFrame(animate);
        }
      });

      observer.observe(ref.current);
    });

    return () => {
      if (observer) observer.disconnect();
    };
  }, [script]);

  return <canvas ref={ref} style={style} />;
}
