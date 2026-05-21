/*
 * Pacientes.tsx — MediCare Hospital System
 * Design: Dark mode premium — Tabela com filtros, busca e modal de detalhes
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Filter, Users, Eye, Phone, Droplets } from "lucide-react";
import { mockPatients } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

const statusConfig: Record<string, { label: string; cls: string }> = {
  stable: { label: "Estável", cls: "badge-stable" },
  critical: { label: "Crítico", cls: "badge-critical" },
  pending: { label: "Observação", cls: "badge-pending" },
};

const genderLabel: Record<string, string> = { M: "Masculino", F: "Feminino" };

export default function Pacientes() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selected, setSelected] = useState<typeof mockPatients[0] | null>(null);

  const filtered = mockPatients.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.diagnosis.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-4 sm:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Pacientes
          </h2>
          <p className="text-sm text-muted-foreground">{mockPatients.length} pacientes cadastrados</p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan self-start sm:self-auto"
          onClick={() => toast.info("Funcionalidade em desenvolvimento", { description: "Cadastro de novos pacientes em breve" })}
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Paciente
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="py-3 px-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, ID ou diagnóstico..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 bg-input/50 border-border h-9 text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
              {["all", "stable", "critical", "pending"].map(s => (
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
        </CardContent>
      </Card>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Estáveis", count: mockPatients.filter(p => p.status === "stable").length, cls: "text-green-400" },
          { label: "Críticos", count: mockPatients.filter(p => p.status === "critical").length, cls: "text-red-400" },
          { label: "Observação", count: mockPatients.filter(p => p.status === "pending").length, cls: "text-amber-400" },
        ].map(s => (
          <Card key={s.label} className="bg-card border-border">
            <CardContent className="py-3 px-4 text-center">
              <p className={`text-2xl font-bold font-mono ${s.cls}`}>{s.count}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card className="bg-card border-border overflow-hidden">
        <CardHeader className="pb-0 px-4 pt-4">
          <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Lista de Pacientes ({filtered.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 mt-3">
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium">ID</th>
                  <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium">Paciente</th>
                  <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium">Idade</th>
                  <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium">Tipo Sang.</th>
                  <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium">Diagnóstico</th>
                  <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium">Médico</th>
                  <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium">Ala</th>
                  <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium">Status</th>
                  <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => {
                  const s = statusConfig[p.status] || { label: p.status, cls: "badge-info" };
                  return (
                    <motion.tr
                      key={p.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="border-b border-border/50 table-row-hover"
                    >
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.id}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                            <span className="text-[9px] font-bold text-primary">{p.name.split(" ").map(n => n[0]).slice(0, 2).join("")}</span>
                          </div>
                          <span className="text-xs font-medium text-foreground">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-foreground">{p.age} anos</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 text-xs text-red-400">
                          <Droplets className="w-3 h-3" />{p.blood}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground max-w-[160px] truncate">{p.diagnosis}</td>
                      <td className="px-4 py-3 text-xs text-foreground">{p.doctor}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{p.ward}</td>
                      <td className="px-4 py-3"><span className={s.cls}>{s.label}</span></td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="icon" className="w-7 h-7 text-muted-foreground hover:text-primary" onClick={() => setSelected(p)}>
                          <Eye className="w-3.5 h-3.5" />
                        </Button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-border">
            {filtered.map(p => {
              const s = statusConfig[p.status] || { label: p.status, cls: "badge-info" };
              return (
                <div key={p.id} className="px-4 py-3 table-row-hover" onClick={() => setSelected(p)}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-primary">{p.name.split(" ").map(n => n[0]).slice(0, 2).join("")}</span>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-foreground">{p.name}</p>
                        <p className="text-[10px] text-muted-foreground">{p.id} · {p.age} anos</p>
                      </div>
                    </div>
                    <span className={s.cls}>{s.label}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground ml-10">{p.diagnosis} · {p.ward}</p>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <Users className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-40" />
              <p className="text-sm text-muted-foreground">Nenhum paciente encontrado</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center gap-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <Users className="w-4 h-4 text-primary" />
              Detalhes do Paciente
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{selected.name.split(" ").map(n => n[0]).slice(0, 2).join("")}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{selected.name}</p>
                  <p className="text-xs text-muted-foreground">{selected.id} · {genderLabel[selected.gender]} · {selected.age} anos</p>
                </div>
                <span className={`ml-auto ${statusConfig[selected.status]?.cls || "badge-info"}`}>
                  {statusConfig[selected.status]?.label || selected.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {[
                  { label: "Tipo Sanguíneo", value: selected.blood, icon: <Droplets className="w-3 h-3 text-red-400" /> },
                  { label: "Telefone", value: selected.phone, icon: <Phone className="w-3 h-3 text-primary" /> },
                  { label: "Médico Responsável", value: selected.doctor },
                  { label: "Ala / Leito", value: selected.ward },
                  { label: "Data de Admissão", value: new Date(selected.admission).toLocaleDateString("pt-BR") },
                  { label: "Diagnóstico", value: selected.diagnosis },
                ].map(f => (
                  <div key={f.label} className="p-2.5 rounded-md bg-muted/40 border border-border/50">
                    <p className="text-[10px] text-muted-foreground mb-0.5 flex items-center gap-1">{f.icon}{f.label}</p>
                    <p className="font-medium text-foreground">{f.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
