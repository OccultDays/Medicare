/*
 * Dashboard.tsx — MediCare Hospital System
 * Design: Dark mode premium — Cards de métricas com glow, gráficos Recharts
 * Layout assimétrico com grid de stats + gráfico de barras + lista de atividades
 */
import { motion } from "framer-motion";
import {
  Users, Stethoscope, Calendar, BedDouble, AlertTriangle,
  Scissors, UserCheck, TrendingUp, Activity, Clock
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { dashboardStats, weeklyData, departmentData, mockAppointments, mockPatients } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const statCards = [
  { label: "Total de Pacientes", value: dashboardStats.totalPatients, icon: Users, color: "cyan", sub: `+${dashboardStats.patientsToday} hoje` },
  { label: "Consultas Hoje", value: dashboardStats.appointments, icon: Calendar, color: "green", sub: "8 confirmadas" },
  { label: "Leitos Disponíveis", value: dashboardStats.availableBeds, icon: BedDouble, color: "amber", sub: `de ${dashboardStats.totalBeds} total` },
  { label: "Pacientes Críticos", value: dashboardStats.criticalPatients, icon: AlertTriangle, color: "red", sub: "Monitoramento ativo" },
  { label: "Cirurgias Hoje", value: dashboardStats.surgeriesToday, icon: Scissors, color: "purple", sub: "2 em andamento" },
  { label: "Médicos de Plantão", value: dashboardStats.doctorsOnDuty, icon: Stethoscope, color: "cyan", sub: "3 especialistas" },
];

const colorMap: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20", glow: "glow-cyan" },
  green: { bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/20", glow: "glow-green" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", glow: "glow-amber" },
  red: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20", glow: "" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20", glow: "" },
};

const statusLabel: Record<string, { label: string; cls: string }> = {
  confirmed: { label: "Confirmada", cls: "badge-stable" },
  "in-progress": { label: "Em Andamento", cls: "badge-info" },
  pending: { label: "Pendente", cls: "badge-pending" },
  cancelled: { label: "Cancelada", cls: "badge-critical" },
};

const patientStatus: Record<string, { label: string; cls: string }> = {
  stable: { label: "Estável", cls: "badge-stable" },
  critical: { label: "Crítico", cls: "badge-critical" },
  pending: { label: "Observação", cls: "badge-pending" },
};

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

export default function Dashboard() {
  const todayAppts = mockAppointments.slice(0, 5);
  const recentPatients = mockPatients.slice(0, 5);
  const occupancy = Math.round(((dashboardStats.totalBeds - dashboardStats.availableBeds) / dashboardStats.totalBeds) * 100);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Dashboard
          </h2>
          <p className="text-sm text-muted-foreground">Visão geral do hospital em tempo real</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          <span>Atualizado agora</span>
          <span className="pulse-dot" />
        </div>
      </div>

      {/* Stat cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3"
      >
        {statCards.map((card) => {
          const c = colorMap[card.color];
          const Icon = card.icon;
          return (
            <motion.div key={card.label} variants={item}>
              <div className={`stat-card ${c.glow}`}>
                <div className={`w-8 h-8 rounded-lg ${c.bg} border ${c.border} flex items-center justify-center mb-3`}>
                  <Icon className={`w-4 h-4 ${c.text}`} />
                </div>
                <p className="text-2xl font-bold text-foreground font-mono">{card.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{card.label}</p>
                <p className={`text-[10px] mt-1 ${c.text}`}>{card.sub}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Weekly chart */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Atendimentos da Semana
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.016 264)" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: "oklch(0.55 0.012 220)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "oklch(0.55 0.012 220)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "oklch(0.13 0.014 264)", border: "1px solid oklch(0.22 0.016 264)", borderRadius: "8px", fontSize: 12 }}
                  labelStyle={{ color: "oklch(0.93 0.008 220)" }}
                />
                <Bar dataKey="patients" name="Pacientes" fill="oklch(0.72 0.18 200)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="appointments" name="Consultas" fill="oklch(0.65 0.20 160)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department pie */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Por Departamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={departmentData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="patients">
                  {departmentData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "oklch(0.13 0.014 264)", border: "1px solid oklch(0.22 0.016 264)", borderRadius: "8px", fontSize: 11 }}
                />
                <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 10, color: "oklch(0.55 0.012 220)" }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Today's appointments */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Consultas de Hoje
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {todayAppts.map(appt => {
                const s = statusLabel[appt.status] || { label: appt.status, cls: "badge-info" };
                return (
                  <div key={appt.id} className="flex items-center gap-3 px-4 py-3 table-row-hover">
                    <div className="w-10 text-center shrink-0">
                      <p className="text-xs font-mono font-semibold text-primary">{appt.time}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{appt.patient}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{appt.doctor} · {appt.room}</p>
                    </div>
                    <span className={s.cls}>{s.label}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent patients */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-primary" />
              Pacientes Recentes
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {recentPatients.map(p => {
                const s = patientStatus[p.status] || { label: p.status, cls: "badge-info" };
                return (
                  <div key={p.id} className="flex items-center gap-3 px-4 py-3 table-row-hover">
                    <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-primary">{p.name.split(" ").map(n => n[0]).slice(0, 2).join("")}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{p.name}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{p.diagnosis}</p>
                    </div>
                    <span className={s.cls}>{s.label}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Occupancy bar */}
      <Card className="bg-card border-border">
        <CardContent className="py-4 px-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <BedDouble className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Ocupação de Leitos</span>
            </div>
            <span className="text-sm font-mono font-bold text-foreground">{occupancy}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${occupancy}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, oklch(0.72 0.18 200), oklch(0.65 0.20 160))" }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] text-muted-foreground">{dashboardStats.totalBeds - dashboardStats.availableBeds} ocupados</span>
            <span className="text-[10px] text-green-400">{dashboardStats.availableBeds} disponíveis</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
