/*
 * Medicos.tsx — MediCare Hospital System
 * Design: Dark mode premium — Grid de cards de médicos com status
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Stethoscope, Phone, Mail, Users, CheckCircle, XCircle, Clock } from "lucide-react";
import { mockDoctors } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const statusConfig: Record<string, { label: string; cls: string; icon: React.ReactNode }> = {
  available: { label: "Disponível", cls: "badge-stable", icon: <CheckCircle className="w-3 h-3" /> },
  busy: { label: "Em Atendimento", cls: "badge-pending", icon: <Clock className="w-3 h-3" /> },
  off: { label: "Fora de Plantão", cls: "badge-critical", icon: <XCircle className="w-3 h-3" /> },
};

const specialtyColors: Record<string, string> = {
  "Clínica Geral": "text-cyan-400",
  "Cardiologia": "text-red-400",
  "Ortopedia": "text-amber-400",
  "Neurologia": "text-purple-400",
  "Cirurgia Geral": "text-green-400",
  "Pediatria": "text-pink-400",
};

export default function Medicos() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = mockDoctors.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase()) ||
      d.crm.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || d.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-4 sm:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Médicos
          </h2>
          <p className="text-sm text-muted-foreground">{mockDoctors.length} profissionais cadastrados</p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan self-start sm:self-auto"
          onClick={() => toast.info("Funcionalidade em desenvolvimento")}
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Médico
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, especialidade ou CRM..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 bg-input/50 border-border h-9 text-sm"
          />
        </div>
        <div className="flex gap-2">
          {["all", "available", "busy", "off"].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                statusFilter === s
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "bg-accent text-muted-foreground border border-border hover:text-foreground"
              }`}
            >
              {s === "all" ? "Todos" : statusConfig[s]?.label || s}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Disponíveis", count: mockDoctors.filter(d => d.status === "available").length, cls: "text-green-400" },
          { label: "Em Atendimento", count: mockDoctors.filter(d => d.status === "busy").length, cls: "text-amber-400" },
          { label: "Fora de Plantão", count: mockDoctors.filter(d => d.status === "off").length, cls: "text-red-400" },
        ].map(s => (
          <Card key={s.label} className="bg-card border-border">
            <CardContent className="py-3 px-4 text-center">
              <p className={`text-2xl font-bold font-mono ${s.cls}`}>{s.count}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Doctor cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((doc, i) => {
          const s = statusConfig[doc.status] || { label: doc.status, cls: "badge-info", icon: null };
          const specColor = specialtyColors[doc.specialty] || "text-primary";
          return (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="bg-card border-border hover:border-primary/30 transition-colors group cursor-pointer"
                onClick={() => toast.info(`${doc.name}`, { description: `${doc.specialty} · ${doc.crm}` })}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:glow-cyan transition-all">
                        <span className="text-sm font-bold text-primary">
                          {doc.name.replace("Dr. ", "").replace("Dra. ", "").split(" ").map(n => n[0]).slice(0, 2).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{doc.name}</p>
                        <p className={`text-xs font-medium ${specColor}`}>{doc.specialty}</p>
                      </div>
                    </div>
                    <span className={`${s.cls} flex items-center gap-1`}>{s.icon}{s.label}</span>
                  </div>

                  <div className="space-y-1.5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="w-3 h-3 shrink-0 text-primary/60" />
                      <span className="font-mono">{doc.crm}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3 shrink-0 text-primary/60" />
                      <span>{doc.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3 h-3 shrink-0 text-primary/60" />
                      <span className="truncate">{doc.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3 h-3 shrink-0 text-primary/60" />
                      <span>{doc.patients} pacientes ativos</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">{doc.schedule}</span>
                    <span className="text-[10px] font-mono text-primary">{doc.id}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center">
          <Stethoscope className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-40" />
          <p className="text-sm text-muted-foreground">Nenhum médico encontrado</p>
        </div>
      )}
    </div>
  );
}
