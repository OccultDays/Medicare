/*
 * Login.tsx — MediCare Hospital System
 * Design: Dark mode premium com background de DNA médico
 * Formulário centralizado com glassmorphism
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Hospital, Eye, EyeOff, Loader2, Lock, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import apiService from "@/services/api";

const DEMO_ACCOUNTS = [
  { email: "admin@medicare.com", role: "Administrador" },
  { email: "medico@medicare.com", role: "Médico" },
  { email: "enfermeiro@medicare.com", role: "Enfermeiro(a)" },
];

export default function Login() {
  const [, navigate] = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState("admin@medicare.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Preencha todos os campos");
      return;
    }
    setLoading(true);
    try {
      const response = await apiService.login(email, password);
      if (response.error) {
        toast.error("Credenciais inválidas", { description: response.error });
      } else if (response.data) {
        login(response.data.user);
        toast.success("Acesso autorizado", { description: "Bem-vindo ao MediCare" });
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Erro ao conectar", { description: "Verifique sua conexão" });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("admin123");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663621698726/bfbNSv8KryZZMyQ5DWrpzR/hospital-login-bg-P3XfqL6Wunvct3UK5REjzM.webp)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/5" />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(oklch(0.72 0.18 200) 1px, transparent 1px), linear-gradient(90deg, oklch(0.72 0.18 200) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-4"
      >
        {/* Card */}
        <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-4 glow-cyan">
              <Hospital className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              MediCare
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Sistema de Gestão Hospitalar</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm text-foreground/80">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@medicare.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="pl-9 bg-input/50 border-border focus:border-primary/60 focus:ring-primary/20"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm text-foreground/80">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="pl-9 pr-9 bg-input/50 border-border focus:border-primary/60 focus:ring-primary/20"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-10 font-semibold bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan transition-all"
              disabled={loading}
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Autenticando...</>
              ) : (
                <><ShieldCheck className="w-4 h-4 mr-2" /> Entrar no Sistema</>
              )}
            </Button>
          </form>

          {/* Demo accounts */}
          <div className="mt-6 pt-5 border-t border-border">
            <p className="text-xs text-muted-foreground text-center mb-3">Contas de demonstração (qualquer senha)</p>
            <div className="space-y-2">
              {DEMO_ACCOUNTS.map(acc => (
                <button
                  key={acc.email}
                  onClick={() => fillDemo(acc.email)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-md bg-accent/50 hover:bg-accent border border-border/50 transition-colors group"
                >
                  <span className="text-xs text-foreground/70 group-hover:text-foreground">{acc.email}</span>
                  <span className="text-[10px] text-primary font-medium px-1.5 py-0.5 rounded bg-primary/10">{acc.role}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          MediCare v1.0 · Sistema Hospitalar Integrado
        </p>
      </motion.div>
    </div>
  );
}
