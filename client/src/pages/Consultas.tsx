/*
 * Consultas.tsx — MediCare Hospital System
 * Design: Dark mode premium — Agenda de consultas com filtros de data
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Calendar, Clock, MapPin, User, Stethoscope } from "lucide-react";
import { mockAppointments } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const statusConfig: Record<string, { label: string; cls: string }> = {
  confirmed: { label: "Confirmada", cls: "badge-stable" },
  "in-progress": { label: "Em Andamento", cls: "badge-info" },
  pending: { label: "Pendente", cls: "badge-pending" },
  cancelled: { label: "Cancelada", cls: "badge-critical" },
};

const typeColors: Record<string, string> = {
  "Consulta": "text-cyan-400",
  "Retorno": "text-green-400",
  "Exame": "text-amber-400",
  "Cirurgia": "text-red-400",
  "Avaliação": "text-purple-400",
};

const uniqueDates = Array.from(new Set(mockAppointments.map(a => a.date))).sort();

export default function Consultas() {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = mockAppointments.filter(a => {
    const matchSearch = a.patient.toLowerCase().includes(search.toLowerCase()) ||
      a.doctor.toLowerCase().includes(search.toLowerCase()) ||
      a.type.toLowerCase().includes(search.toLowerCase());
    const matchDate = dateFilter === "all" || a.date === dateFilter;
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchDate && matchStatus;
  });

  const grouped = filtered.reduce<Record<string, typeof filtered>>((acc, appt) => {
    if (!acc[appt.date]) acc[appt.date] = [];
    acc[appt.date].push(appt);
    return acc;
  }, {});

  const formatDate = (d: string) => new Date(d + "T12:00:00").toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" });

  return (
    <div className="p-4 sm:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Consultas
          </h2>
          <p className="text-sm text-muted-foreground">{mockAppointments.length} consultas agendadas</p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan self-start sm:self-auto"
          onClick={() => toast.info("Funcionalidade em desenvolvimento")}
        >
          <Plus className="w-4 h-4 mr-2" />
          Agendar Consulta
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Confirmadas", count: mockAppointments.filter(a => a.status === "confirmed").length, cls: "text-green-400" },
          { label: "Em Andamento", count: mockAppointments.filter(a => a.status === "in-progress").length, cls: "text-cyan-400" },
          { label: "Pendentes", count: mockAppointments.filter(a => a.status === "pending").length, cls: "text-amber-400" },
          { label: "Canceladas", count: mockAppointments.filter(a => a.status === "cancelled").length, cls: "text-red-400" },
        ].map(s => (
          <Card key={s.label} className="bg-card border-border">
            <CardContent className="py-3 px-4 text-center">
              <p className={`text-2xl font-bold font-mono ${s.cls}`}>{s.count}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="py-3 px-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por paciente, médico ou tipo..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 bg-input/50 border-border h-9 text-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Data:</span>
            </div>
            <button
              onClick={() => setDateFilter("all")}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${dateFilter === "all" ? "bg-primary/20 text-primary border border-primary/30" : "bg-accent text-muted-foreground border border-border hover:text-foreground"}`}
            >
              Todas
            </button>
            {uniqueDates.map(d => (
              <button
                key={d}
                onClick={() => setDateFilter(d)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${dateFilter === d ? "bg-primary/20 text-primary border border-primary/30" : "bg-accent text-muted-foreground border border-border hover:text-foreground"}`}
              >
                {new Date(d + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Status:</span>
            </div>
            {["all", "confirmed", "in-progress", "pending"].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${statusFilter === s ? "bg-primary/20 text-primary border border-primary/30" : "bg-accent text-muted-foreground border border-border hover:text-foreground"}`}
              >
                {s === "all" ? "Todos" : statusConfig[s]?.label || s}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Grouped appointments */}
      <div className="space-y-5">
        {Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([date, appts]) => (
          <div key={date}>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider capitalize">
                {formatDate(date)}
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="space-y-2">
              {appts.map((appt, i) => {
                const s = statusConfig[appt.status] || { label: appt.status, cls: "badge-info" };
                const typeColor = typeColors[appt.type] || "text-primary";
                return (
                  <motion.div
                    key={appt.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="bg-card border-border hover:border-primary/30 transition-colors cursor-pointer"
                      onClick={() => toast.info(`${appt.type} — ${appt.patient}`, { description: `${appt.doctor} · ${appt.room}` })}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="text-center shrink-0 w-12">
                            <p className="text-base font-bold font-mono text-primary">{appt.time}</p>
                            <p className={`text-[10px] font-semibold ${typeColor}`}>{appt.type}</p>
                          </div>
                          <div className="w-px h-10 bg-border shrink-0" />
                          <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-3 gap-1">
                            <div className="flex items-center gap-1.5">
                              <User className="w-3 h-3 text-muted-foreground shrink-0" />
                              <span className="text-xs font-medium text-foreground truncate">{appt.patient}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Stethoscope className="w-3 h-3 text-muted-foreground shrink-0" />
                              <span className="text-xs text-muted-foreground truncate">{appt.doctor}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3 h-3 text-muted-foreground shrink-0" />
                              <span className="text-xs text-muted-foreground">{appt.room}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className={s.cls}>{s.label}</span>
                            <span className="text-[10px] font-mono text-muted-foreground hidden sm:block">{appt.id}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <Calendar className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-40" />
            <p className="text-sm text-muted-foreground">Nenhuma consulta encontrada</p>
          </div>
        )}
      </div>
    </div>
  );
}
