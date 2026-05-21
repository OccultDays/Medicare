// MediCare Hospital System — Mock Data
// Dados fictícios para demonstração do sistema

export const mockPatients = [
  { id: "P-001", name: "Ana Clara Ferreira", age: 34, gender: "F", blood: "A+", phone: "(11) 98765-4321", doctor: "Dr. Carlos Mendes", status: "stable", ward: "Enfermaria 2", admission: "2025-04-28", diagnosis: "Pneumonia Bacteriana" },
  { id: "P-002", name: "Roberto Silva Santos", age: 67, gender: "M", blood: "O-", phone: "(21) 97654-3210", doctor: "Dra. Mariana Costa", status: "critical", ward: "UTI-01", admission: "2025-04-30", diagnosis: "Infarto Agudo do Miocárdio" },
  { id: "P-003", name: "Juliana Pereira Lima", age: 28, gender: "F", blood: "B+", phone: "(31) 96543-2109", doctor: "Dr. Felipe Rocha", status: "stable", ward: "Maternidade", admission: "2025-05-01", diagnosis: "Pré-natal de Alto Risco" },
  { id: "P-004", name: "Marcos Antônio Gomes", age: 52, gender: "M", blood: "AB+", phone: "(41) 95432-1098", doctor: "Dr. Carlos Mendes", status: "pending", ward: "Cirurgia", admission: "2025-05-02", diagnosis: "Apendicite Aguda" },
  { id: "P-005", name: "Fernanda Oliveira Cruz", age: 45, gender: "F", blood: "O+", phone: "(51) 94321-0987", doctor: "Dra. Mariana Costa", status: "stable", ward: "Cardiologia", admission: "2025-04-25", diagnosis: "Hipertensão Arterial" },
  { id: "P-006", name: "Lucas Eduardo Martins", age: 19, gender: "M", blood: "A-", phone: "(61) 93210-9876", doctor: "Dr. Felipe Rocha", status: "stable", ward: "Ortopedia", admission: "2025-05-01", diagnosis: "Fratura de Fêmur" },
  { id: "P-007", name: "Carla Regina Sousa", age: 73, gender: "F", blood: "B-", phone: "(71) 92109-8765", doctor: "Dr. Carlos Mendes", status: "critical", ward: "UTI-02", admission: "2025-04-29", diagnosis: "AVC Isquêmico" },
  { id: "P-008", name: "Paulo Henrique Dias", age: 41, gender: "M", blood: "O+", phone: "(81) 91098-7654", doctor: "Dra. Mariana Costa", status: "pending", ward: "Neurologia", admission: "2025-05-02", diagnosis: "Enxaqueca Crônica" },
];

export const mockDoctors = [
  { id: "D-001", name: "Dr. Carlos Mendes", specialty: "Clínica Geral", crm: "CRM-SP 12345", phone: "(11) 98000-1111", email: "carlos.mendes@medicare.com", status: "available", patients: 12, schedule: "Seg-Sex 08h-17h" },
  { id: "D-002", name: "Dra. Mariana Costa", specialty: "Cardiologia", crm: "CRM-SP 23456", phone: "(11) 98000-2222", email: "mariana.costa@medicare.com", status: "busy", patients: 8, schedule: "Seg-Sex 09h-18h" },
  { id: "D-003", name: "Dr. Felipe Rocha", specialty: "Ortopedia", crm: "CRM-SP 34567", phone: "(11) 98000-3333", email: "felipe.rocha@medicare.com", status: "available", patients: 15, schedule: "Ter-Sab 07h-16h" },
  { id: "D-004", name: "Dra. Beatriz Alves", specialty: "Neurologia", crm: "CRM-SP 45678", phone: "(11) 98000-4444", email: "beatriz.alves@medicare.com", status: "off", patients: 0, schedule: "Seg-Sex 10h-19h" },
  { id: "D-005", name: "Dr. Ricardo Nunes", specialty: "Cirurgia Geral", crm: "CRM-SP 56789", phone: "(11) 98000-5555", email: "ricardo.nunes@medicare.com", status: "available", patients: 6, schedule: "Seg-Sex 06h-15h" },
  { id: "D-006", name: "Dra. Patrícia Lemos", specialty: "Pediatria", crm: "CRM-SP 67890", phone: "(11) 98000-6666", email: "patricia.lemos@medicare.com", status: "busy", patients: 20, schedule: "Seg-Sex 08h-17h" },
];

export const mockAppointments = [
  { id: "A-001", patient: "Ana Clara Ferreira", doctor: "Dr. Carlos Mendes", date: "2025-05-02", time: "09:00", type: "Consulta", status: "confirmed", room: "Sala 3" },
  { id: "A-002", patient: "Roberto Silva Santos", doctor: "Dra. Mariana Costa", date: "2025-05-02", time: "10:30", type: "Retorno", status: "in-progress", room: "Sala 1" },
  { id: "A-003", patient: "Juliana Pereira Lima", doctor: "Dr. Felipe Rocha", date: "2025-05-02", time: "11:00", type: "Exame", status: "pending", room: "Sala 5" },
  { id: "A-004", patient: "Marcos Antônio Gomes", doctor: "Dr. Ricardo Nunes", date: "2025-05-02", time: "14:00", type: "Cirurgia", status: "confirmed", room: "Centro Cirúrgico" },
  { id: "A-005", patient: "Fernanda Oliveira Cruz", doctor: "Dra. Mariana Costa", date: "2025-05-03", time: "08:30", type: "Consulta", status: "confirmed", room: "Sala 2" },
  { id: "A-006", patient: "Lucas Eduardo Martins", doctor: "Dr. Felipe Rocha", date: "2025-05-03", time: "09:30", type: "Retorno", status: "pending", room: "Sala 4" },
  { id: "A-007", patient: "Carla Regina Sousa", doctor: "Dra. Beatriz Alves", date: "2025-05-03", time: "10:00", type: "Avaliação", status: "confirmed", room: "Sala 6" },
  { id: "A-008", patient: "Paulo Henrique Dias", doctor: "Dra. Beatriz Alves", date: "2025-05-04", time: "15:00", type: "Consulta", status: "pending", room: "Sala 6" },
];

export const mockRecords = [
  { id: "R-001", patientId: "P-001", patient: "Ana Clara Ferreira", doctor: "Dr. Carlos Mendes", date: "2025-04-28", diagnosis: "Pneumonia Bacteriana", notes: "Paciente apresenta febre 38.5°C, tosse produtiva e dispneia leve. Iniciado antibioticoterapia com Amoxicilina 500mg 8/8h. Solicitado RX de tórax e hemograma completo.", medications: ["Amoxicilina 500mg", "Dipirona 500mg", "Mucosolvan 30mg"], exams: ["RX Tórax", "Hemograma", "PCR"] },
  { id: "R-002", patientId: "P-002", patient: "Roberto Silva Santos", doctor: "Dra. Mariana Costa", date: "2025-04-30", diagnosis: "IAM com Supra de ST", notes: "Paciente admitido com dor precordial intensa irradiando para MSE. ECG evidencia supra de ST em V1-V4. Submetido à angioplastia primária com sucesso. Internado em UTI para monitorização.", medications: ["AAS 100mg", "Clopidogrel 75mg", "Atorvastatina 80mg", "Metoprolol 50mg"], exams: ["ECG", "Troponina", "Cateterismo", "Ecocardiograma"] },
  { id: "R-003", patientId: "P-003", patient: "Juliana Pereira Lima", doctor: "Dr. Felipe Rocha", date: "2025-05-01", diagnosis: "Pré-natal Alto Risco", notes: "Gestante de 32 semanas com pré-eclâmpsia leve. PA 145/95 mmHg. Proteinúria 2+. Iniciado sulfato de magnésio e anti-hipertensivo. Monitorização fetal contínua.", medications: ["Metildopa 500mg", "AAS 100mg", "Sulfato de Magnésio"], exams: ["USG Obstétrica", "CTG", "Proteinúria 24h", "Hemograma"] },
];

export const dashboardStats = {
  totalPatients: 247,
  patientsToday: 18,
  appointments: 34,
  availableBeds: 42,
  totalBeds: 120,
  criticalPatients: 8,
  surgeriesToday: 5,
  doctorsOnDuty: 12,
};

export const weeklyData = [
  { day: "Seg", patients: 32, appointments: 45 },
  { day: "Ter", patients: 28, appointments: 38 },
  { day: "Qua", patients: 35, appointments: 52 },
  { day: "Qui", patients: 30, appointments: 41 },
  { day: "Sex", patients: 42, appointments: 58 },
  { day: "Sab", patients: 25, appointments: 30 },
  { day: "Dom", patients: 18, appointments: 22 },
];

export const departmentData = [
  { name: "Clínica Geral", patients: 68, color: "oklch(0.72 0.18 200)" },
  { name: "Cardiologia", patients: 42, color: "oklch(0.65 0.22 25)" },
  { name: "Ortopedia", patients: 35, color: "oklch(0.75 0.18 85)" },
  { name: "Neurologia", patients: 28, color: "oklch(0.70 0.15 300)" },
  { name: "Pediatria", patients: 45, color: "oklch(0.65 0.20 160)" },
  { name: "Cirurgia", patients: 29, color: "oklch(0.72 0.12 240)" },
];
