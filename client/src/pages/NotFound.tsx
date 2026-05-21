import { Link } from "wouter";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowLeft, Hospital } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center px-4"
      >
        <div className="w-16 h-16 rounded-2xl bg-destructive/10 border border-destructive/30 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-destructive" />
        </div>
        <h1 className="text-6xl font-bold text-foreground mb-2 font-mono">404</h1>
        <h2 className="text-xl font-semibold text-foreground mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Página não encontrada
        </h2>
        <p className="text-sm text-muted-foreground mb-8 max-w-xs mx-auto">
          A rota solicitada não existe no sistema MediCare. Verifique o endereço ou retorne ao início.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/dashboard">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan">
              <Hospital className="w-4 h-4 mr-2" />
              Ir ao Dashboard
            </Button>
          </Link>
          <Button variant="outline" onClick={() => history.back()} className="border-border text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
