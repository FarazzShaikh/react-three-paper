import React, { useEffect, useRef } from "react";

type tPaperRenderLoop = (time?: number) => void;
type tPaperScript = (canvas?: HTMLCanvasElement) => Promise<tPaperRenderLoop>;
type tPaperPositionEvent = (entry: IntersectionObserverEntry) => void;
type tPaperErrorEvent = (error: Error) => void;

interface iPaperPropTypes {
  script: tPaperScript;
  onExit?: tPaperPositionEvent;
  onEntry?: tPaperPositionEvent;
  onError?: tPaperErrorEvent;
  style?: React.CSSProperties;
}

const IntersectionObserverOptions = {
  threshold: 0.01,
};

export function Paper({ script, style, onExit, onEntry, onError }: iPaperPropTypes) {
  const ref = useRef(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    let ID: number = 0;

    script(ref.current)
      .then((callback) => {
        function animate(time: number) {
          callback(time);
          ID = requestAnimationFrame(animate);
        }

        observer = new IntersectionObserver(([entry]) => {
          const { isIntersecting } = entry;
          if (isIntersecting) {
            if (onEntry) onEntry(entry);
            ID = requestAnimationFrame(animate);
          } else {
            if (onExit) onExit(entry);
            cancelAnimationFrame(ID);
          }
        }, IntersectionObserverOptions);

        observer.observe(ref.current);
      })
      .catch((error: Error) => {
        console.error(error);
        if (onError) onError(error);
        cancelAnimationFrame(ID);
      });

    return () => {
      if (observer) observer.disconnect();
    };
  }, [script, ref]);

  return (
    <canvas
      ref={ref}
      style={{
        width: "100%",
        height: "100%",
        ...style,
      }}
    />
  );
}
