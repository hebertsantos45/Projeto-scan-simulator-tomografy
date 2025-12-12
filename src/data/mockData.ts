// Mock data for the application

export const USERS = [
  {
    id: '1',
    name: 'Carlos Silva',
    role: 'student',
    email: 'aluno@sim.com',
    avatar: 'https://i.pravatar.cc/150?u=1',
    progress: 65,
    plan: 'Anual',
    status: 'active'
  },
  {
    id: '2',
    name: 'Dra. Ana Souza',
    role: 'professor',
    email: 'prof@sim.com',
    avatar: 'https://i.pravatar.cc/150?u=2',
    specialty: 'Neurorradiologia'
  },
  {
    id: '3',
    name: 'Admin',
    role: 'admin',
    email: 'admin@sim.com',
    avatar: 'https://i.pravatar.cc/150?u=3',
  }
];

export const MACHINES = [
  {
    id: 'siemens',
    name: 'Siemens Somatom Force',
    brand: 'Siemens',
    color: 'bg-slate-800', // Dark theme
    textColor: 'text-slate-100',
    accentColor: 'bg-cyan-600',
    features: ['Dual Source', 'Turbo Flash', 'Stellar Detector']
  },
  {
    id: 'ge',
    name: 'GE Revolution CT',
    brand: 'GE',
    color: 'bg-zinc-200', // Light theme
    textColor: 'text-zinc-900',
    accentColor: 'bg-blue-600',
    features: ['Gemstone Detector', 'Smart Dose', 'Organ Effective']
  },
  {
    id: 'philips',
    name: 'Philips IQon Spectral',
    brand: 'Philips',
    color: 'bg-gray-900',
    textColor: 'text-white',
    accentColor: 'bg-orange-500',
    features: ['Spectral CT', 'NanoPanel', 'iPatient']
  },
  {
    id: 'canon',
    name: 'Canon Aquilion One',
    brand: 'Canon',
    color: 'bg-neutral-100',
    textColor: 'text-neutral-800',
    accentColor: 'bg-red-600',
    features: ['Area Detector', 'AiCE', '4D CT']
  }
];

export const EXAMS = [
  { id: 'skull', name: 'TC de Crânio', category: 'Neuro', difficulty: 'Básico' },
  { id: 'chest', name: 'TC de Tórax', category: 'Corpo', difficulty: 'Intermediário' },
  { id: 'abd', name: 'TC Abdome Total', category: 'Corpo', difficulty: 'Avançado' },
  { id: 'angio_cor', name: 'Angio TC Coronárias', category: 'Cardio', difficulty: 'Expert' },
];

export const PATIENTS = [
  { id: 'p1', name: 'João M. (45 anos)', condition: 'Cefaleia súbita', type: 'Cooperativo', biotype: 'Normolíneo' },
  { id: 'p2', name: 'Maria L. (72 anos)', condition: 'Dispneia', type: 'Idoso / Confuso', biotype: 'Brevilíneo' },
  { id: 'p3', name: 'Pedro K. (8 anos)', condition: 'Trauma', type: 'Pediátrico / Agitado', biotype: 'Astênico' },
];
