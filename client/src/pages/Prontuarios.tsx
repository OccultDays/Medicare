/*
 * Prontuarios.tsx — MediCare Hospital System
 * Design: Dark mode premium — Prontuários médicos com visualização detalhada
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, FileText, Pill, FlaskConical, ChevronDown, ChevronUp, Calendar, Stethoscope } from "lucide-react";
import { mockRecords } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Prontuarios() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(mockRecords[0]?.id || null);

  const filtered = mockRecords.filter(r =>
    r.patient.toLowerCase().includes(search.toLowerCase()) ||
    r.diagnosis.toLowerCase().includes(search.toLowerCase()) ||
    r.doctor.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (id: string) => setExpanded(prev => prev === id ? null : id);

  return (
    <div className="p-4 sm:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Prontuários
          </h2>
          <p className="text-sm text-muted-foreground">{mockRecords.length} prontuários disponíveis</p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan self-start sm:self-auto"
          onClick={() => toast.info("Funcionalidade em desenvolvimento")}
        >
          <FileText className="w-4 h-4 mr-2" />
          Novo Prontuário
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por paciente, diagnóstico ou médico..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9 bg-input/50 border-border h-9 text-sm"
        />
      </div>

      {/* Records */}
      <div className="space-y-3">
        {filtered.map((record, i) => (
          <motion.div
            key={record.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className={`bg-card border-border transition-all ${expanded === record.id ? "border-primary/40" : "hover:border-border"}`}>
              {/* Header row */}
              <button
                className="w-full text-left"
                onClick={() => toggle(record.id)}
              >
                <CardHeader className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <CardTitle className="text-sm font-semibold text-foreground">{record.patient}</CardTitle>
                        <span className="badge-info">{record.id}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">
                        {record.diagnosis} · {record.doctor}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(record.date).toLocaleDateString("pt-BR")}
                      </div>
                      {expanded === record.id
                        ? <ChevronUp className="w-4 h-4 text-primary" />
                        : <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      }
                    </div>
                  </div>
                </CardHeader>
              </button>

              {/* Expanded content */}
              {expanded === record.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <CardContent className="pt-0 px-4 pb-4 space-y-4">
                    <div className="h-px bg-border" />

                    {/* Notes */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Stethoscope className="w-3.5 h-3.5 text-primary" />
                        <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide">Evolução / Notas Clínicas</h4>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/40 border border-border/50">
                        <p className="text-xs text-foreground/80 leading-relaxed">{record.notes}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Medications */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Pill className="w-3.5 h-3.5 text-amber-400" />
                          <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide">Medicamentos</h4>
                        </div>
                        <div className="space-y-1.5">
                          {record.medications.map((med, idx) => (
                            <div key={idx} className="flex items-center gap-2 px-3 py-2 rounded-md bg-amber-500/5 border border-amber-500/15">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                              <span className="text-xs text-foreground/80">{med}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Exams */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />
                          <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide">Exames Solicitados</h4>
                        </div>
                        <div className="space-y-1.5">
                          {record.exams.map((exam, idx) => (
                            <div key={idx} className="flex items-center gap-2 px-3 py-2 rounded-md bg-cyan-500/5 border border-cyan-500/15">
                              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                              <span className="text-xs text-foreground/80">{exam}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>Registrado em {new Date(record.date).toLocaleDateString("pt-BR")}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs border-border text-muted-foreground hover:text-foreground"
                        onClick={() => toast.info("Impressão em desenvolvimento")}
                      >
                        Imprimir
                      </Button>
                    </div>
                  </CardContent>
                </motion.div>
              )}
            </Card>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-40" />
            <p className="text-sm text-muted-foreground">Nenhum prontuário encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}
