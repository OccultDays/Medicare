// usePWA.ts — MediCare Hospital System
// Hook para gerenciar o registro do Service Worker e funcionalidades PWA

import { useEffect, useState } from "react";

interface PWAState {
  isInstallable: boolean;
  isInstalled: boolean;
  isOnline: boolean;
  swRegistered: boolean;
  install: () => Promise<void>;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function usePWA(): PWAState {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [swRegistered, setSwRegistered] = useState(false);

  useEffect(() => {
    // Register Service Worker
    //if ("serviceWorker" in navigator) {
      //navigator.serviceWorker
        //.register("/sw.js")
        //.then((registration) => {
         // console.log("[PWA] Service Worker registered:", registration.scope);
         // setSwRegistered(true);
       // })
       // .catch((error) => {
         // console.error("[PWA] Service Worker registration failed:", error);
       // });
   // }

    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Listen for install prompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      deferredPrompt = e as BeforeInstallPromptEvent;
      setIsInstallable(true);
    };

    // Online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setIsInstallable(false);
      deferredPrompt = null;
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const install = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
      setIsInstallable(false);
    }
    deferredPrompt = null;
  };

  return { isInstallable, isInstalled, isOnline, swRegistered, install };
}
