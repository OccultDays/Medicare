/*
 * Layout.tsx — MediCare Hospital System
 * Design: Futurismo Médico Dark Mode — Sidebar fixa com ícones luminosos
 * Sidebar escura com nav items com glow effect no estado ativo
 */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Users, Stethoscope, Calendar, FileText,
  Bell, Settings, LogOut, Menu, X, Activity, ChevronRight,
  Hospital
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/pacientes", label: "Pacientes", icon: Users },
  { path: "/medicos", label: "Médicos", icon: Stethoscope },
  { path: "/consultas", label: "Consultas", icon: Calendar },
  { path: "/prontuarios", label: "Prontuários", icon: FileText },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location, navigate] = useLocation();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNotifications = () => {
    toast.info("Você tem 3 notificações pendentes", { description: "2 alertas críticos, 1 lembrete de consulta" });
  };

  const getInitials = (name: string) => name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-border">
        <div className="w-9 h-9 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center glow-cyan">
          <Hospital className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="font-bold text-base text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>MediCare</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Sistema Hospitalar</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest px-3 mb-3">Menu Principal</p>
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = location === path || location.startsWith(path + "/");
          return (
            <Link key={path} href={path}>
              <div
                className={`nav-item ${isActive ? "active" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                <Icon className="w-4.5 h-4.5 shrink-0" />
                <span className="text-sm">{label}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-60" />}
              </div>
            </Link>
          );
        })}

        <div className="pt-4">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest px-3 mb-3">Sistema</p>
          <button
            className="nav-item w-full"
            onClick={() => { toast.info("Configurações em breve"); setMobileOpen(false); }}
          >
            <Settings className="w-4.5 h-4.5 shrink-0" />
            <span className="text-sm">Configurações</span>
          </button>
        </div>
      </nav>

      {/* User info */}
      <div className="px-3 py-4 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-md bg-accent/50">
          <Avatar className="w-8 h-8 shrink-0">
            <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">
              {user ? getInitials(user.name) : "??"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">{user?.name}</p>
            <p className="text-[10px] text-muted-foreground truncate">{user?.role}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="w-7 h-7 text-muted-foreground hover:text-destructive shrink-0"
            onClick={handleLogout}
            title="Sair"
          >
            <LogOut className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-sidebar border-r border-sidebar-border">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-60 bg-sidebar border-r border-sidebar-border z-50 lg:hidden flex flex-col"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="h-14 shrink-0 border-b border-border bg-card/50 backdrop-blur-sm flex items-center px-4 gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-muted-foreground"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-2 flex-1">
            <Activity className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground hidden sm:block">
              {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
              <span className="pulse-dot" />
              <span className="text-xs text-green-400 font-medium">Sistema Online</span>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="relative text-muted-foreground hover:text-foreground"
              onClick={handleNotifications}
            >
              <Bell className="w-4.5 h-4.5" />
              <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-[9px] bg-destructive border-0">3</Badge>
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
