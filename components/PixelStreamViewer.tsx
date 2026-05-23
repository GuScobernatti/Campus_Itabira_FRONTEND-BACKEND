"use client";
import { useEffect, useRef, useState } from "react";
import {
  Config,
  PixelStreaming,
} from "@epicgames-ps/lib-pixelstreamingfrontend-ue5.4";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const PixelStreamViewer = () => {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<PixelStreaming | null>(null);

  const [isConnecting, setIsConnecting] = useState(true);
  const [isMouseLocked, setIsMouseLocked] = useState(false);

  const isMouseLockedRef = useRef(false);

  useEffect(() => {
    if (!videoContainerRef.current) return;

    const config: Config = new Config({
      initialSettings: {
        ss: "ws://127.0.0.1:80",
        AutoPlayVideo: true,
        AutoConnect: true,
        StartVideoMuted: true,
        HoveringMouse: false,
      },
    });

    const stream = new PixelStreaming(config, {
      videoElementParent: videoContainerRef.current,
    });
    streamRef.current = stream;

    stream.addEventListener("playStream", () => {
      setIsConnecting(false);
    });
    stream.addEventListener("webRtcDisconnected", () => {
      setIsConnecting(true);
    });

    return () => {
      if (streamRef.current) {
        streamRef.current.disconnect();
        streamRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const handlePointerLockChange = () => {
      if (
        videoContainerRef.current &&
        videoContainerRef.current.contains(document.pointerLockElement)
      ) {
        setIsMouseLocked(true);
        isMouseLockedRef.current = true;
      } else {
        setIsMouseLocked(false);
        isMouseLockedRef.current = false;
      }
    };

    document.addEventListener("pointerlockchange", handlePointerLockChange);
    return () => {
      document.removeEventListener(
        "pointerlockchange",
        handlePointerLockChange,
      );
    };
  }, []);

  useEffect(() => {
    const container = videoContainerRef.current;
    if (!container) return;

    const blockMouseMove = (e: MouseEvent) => {
      if (!isMouseLockedRef.current) {
        e.stopImmediatePropagation();
      }
    };

    container.addEventListener("mousemove", blockMouseMove, true);

    return () => {
      container.removeEventListener("mousemove", blockMouseMove, true);
    };
  }, []);

  const handleLockMouse = () => {
    if (videoContainerRef.current) {
      videoContainerRef.current.requestPointerLock();
    }
  };

  return (
    <div className="relative w-screen h-screen bg-black">
      <Link href="/">
        <div className="absolute top-4 left-4 z-30 flex items-center gap-2 bg-zinc-800 bg-opacity-75 px-3 py-1 rounded cursor-pointer">
          <button className="text-white hover:text-[#003A70] transition-colors flex items-center justify-center cursor-pointer">
            <ArrowLeft /> Voltar
          </button>
        </div>
      </Link>

      {isConnecting && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-zinc-900">
          <div className="w-12 h-12 border-4 border-[#003A70] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white font-semibold animate-pulse">
            Conectando ao Campus Virtual...
          </p>
        </div>
      )}

      {!isConnecting && !isMouseLocked && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none">
          <p className="text-white text-sm bg-black bg-opacity-70 backdrop-blur-md px-6 py-2 rounded-full shadow-2xl animate-bounce">
            Clique na tela do jogo para controlar a câmera
          </p>
        </div>
      )}

      <div
        ref={videoContainerRef}
        onClick={handleLockMouse}
        className="w-full h-full absolute inset-0"
      />
    </div>
  );
};

export default PixelStreamViewer;
