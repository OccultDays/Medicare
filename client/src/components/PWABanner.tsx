// PWABanner.tsx — MediCare Hospital System
// Banner de instalação PWA e indicador de status online/offline

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Wifi, WifiOff, X, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePWA } from "@/hooks/usePWA";

export function PWAInstallBanner() {
  const { isInstallable, isInstalled, install } = usePWA();
  const [dismissed, setDismissed] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isInstallable && !isInstalled && !dismissed) {
      const timer = setTimeout(() => setShow(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [isInstallable, isInstalled, dismissed]);

  const handleInstall = async () => {
    await install();
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-50"
        >
          <div className="bg-card border border-primary/30 rounded-xl p-4 shadow-2xl glow-cyan">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                <Smartphone className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">Instalar MediCare</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Adicione à tela inicial para acesso rápido, mesmo offline.
                </p>
                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    className="h-7 text-xs bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={handleInstall}
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Instalar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs text-muted-foreground"
                    onClick={() => { setShow(false); setDismissed(true); }}
                  >
                    Agora não
                  </Button>
                </div>
              </div>
              <button
                onClick={() => { setShow(false); setDismissed(true); }}
                className="text-muted-foreground hover:text-foreground shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function OfflineBanner() {
  const { isOnline } = usePWA();
  const [wasOffline, setWasOffline] = useState(false);
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setWasOffline(true);
    } else if (wasOffline && isOnline) {
      setShowReconnected(true);
      const timer = setTimeout(() => setShowReconnected(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-2 py-2 bg-amber-500/90 backdrop-blur-sm"
        >
          <WifiOff className="w-4 h-4 text-amber-950" />
          <span className="text-xs font-semibold text-amber-950">Sem conexão — Modo offline ativo</span>
        </motion.div>
      )}
      {showReconnected && (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-2 py-2 bg-green-500/90 backdrop-blur-sm"
        >
          <Wifi className="w-4 h-4 text-green-950" />
          <span className="text-xs font-semibold text-green-950">Conexão restaurada</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
