import React, { useEffect, useRef, useCallback, useState } from "react";

type tPaperRenderLoop = (time?: number) => void;
type tPaperCleanup = () => void;

type tPaperScriptReturn = {
  render: tPaperRenderLoop;
  cleanup?: tPaperCleanup;
};

type tPaperScript = (canvas?: HTMLCanvasElement) => Promise<tPaperScriptReturn>;
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
  const [scriptReturn, setScriptReturn] = useState(null as tPaperScriptReturn);

  const execScript = useCallback(async (promise: Promise<tPaperScriptReturn>, callback: tPaperErrorEvent) => {
    try {
      const r = await promise;
      setScriptReturn(r);
    } catch (error) {
      callback(error);
    }
  }, []);

  useEffect(() => {
    let ID: number = 0;

    if (scriptReturn === null) {
      execScript(script(ref.current), (error: Error) => {
        console.error(error);
        cancelAnimationFrame(ID);
        if (onError) onError(error);
      });
    } else {
      const { render, cleanup } = scriptReturn;

      function animate(time: number) {
        render(time);
        ID = requestAnimationFrame(animate);
      }

      let observer = new IntersectionObserver(([entry]) => {
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

      return () => {
        observer.disconnect();
        if (ID) cancelAnimationFrame(ID);
        if (cleanup) cleanup();
      };
    }
  }, [script, ref, scriptReturn]);

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
