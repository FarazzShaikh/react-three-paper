import React from "react";
declare type tPaperRenderLoop = (time?: number) => void;
declare type tPaperCleanup = () => void;
declare type tPaperScriptReturn = {
    render: tPaperRenderLoop;
    cleanup?: tPaperCleanup;
};
declare type tPaperScript = (canvas?: HTMLCanvasElement) => Promise<tPaperScriptReturn>;
declare type tPaperPositionEvent = (entry: IntersectionObserverEntry) => void;
declare type tPaperErrorEvent = (error: Error) => void;
interface iPaperPropTypes {
    script: tPaperScript;
    onExit?: tPaperPositionEvent;
    onEntry?: tPaperPositionEvent;
    onError?: tPaperErrorEvent;
    style?: React.CSSProperties;
}
export declare function Paper({ script, style, onExit, onEntry, onError }: iPaperPropTypes): JSX.Element;
export {};
