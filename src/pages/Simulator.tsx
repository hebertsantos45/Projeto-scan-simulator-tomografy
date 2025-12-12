import { useState } from 'react';
import { 
  ResizableHandle, 
  ResizablePanel, 
  ResizablePanelGroup 
} from '@/components/ui/resizable';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Maximize2, Minimize2, User, Settings, FileText, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import ControlPanel from '@/components/simulator/ControlPanel';
import GantryView from '@/components/simulator/GantryView';
import VirtualTutor from '@/components/ai/VirtualTutor';
import { MACHINES, EXAMS, PATIENTS } from '@/data/mockData';

export default function Simulator() {
  const navigate = useNavigate();
  const [selectedMachine, setSelectedMachine] = useState(MACHINES[0].id);
  const [selectedExam, setSelectedExam] = useState(EXAMS[0].id);
  const [selectedPatient, setSelectedPatient] = useState(PATIENTS[0].id);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [layout, setLayout] = useState<'split' | 'full'>('split');

  const handleScan = (params: any) => {
    setIsScanning(true);
    toast.info("Iniciando varredura...", { description: "Mantenha o paciente imóvel." });
    
    // Simulate scan duration
    setTimeout(() => {
      setIsScanning(false);
      setScanResult(params);
      toast.success("Exame concluído!", { description: "Imagens enviadas para reconstrução." });
    }, 4000);
  };

  const currentPatient = PATIENTS.find(p => p.id === selectedPatient);
  const currentExam = EXAMS.find(e => e.id === selectedExam);

  return (
    <div className="h-screen w-screen flex flex-col bg-black overflow-hidden">
      {/* Top Bar */}
      <div className="h-14 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white" onClick={() => navigate('/dashboard')}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Simulador TC</span>
            <Badge variant="outline" className="text-zinc-400 border-zinc-700">v2.4</Badge>
          </div>
          <div className="h-6 w-px bg-zinc-800 mx-2" />
          
          <Select value={selectedMachine} onValueChange={setSelectedMachine}>
            <SelectTrigger className="w-[200px] bg-zinc-800 border-zinc-700 text-white h-8">
              <SelectValue placeholder="Selecione o Equipamento" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
              {MACHINES.map(m => (
                <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          {/* Patient Info Card */}
          <Dialog>
             <DialogTrigger asChild>
               <Button variant="outline" className="bg-zinc-800 border-zinc-700 text-zinc-300 h-8 gap-2">
                 <User className="w-4 h-4" />
                 {currentPatient?.name}
               </Button>
             </DialogTrigger>
             <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
               <DialogHeader>
                 <DialogTitle>Seleção de Paciente e Protocolo</DialogTitle>
               </DialogHeader>
               <div className="grid gap-4 py-4">
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="text-xs text-zinc-500">Paciente</label>
                     <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {PATIENTS.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                        </SelectContent>
                     </Select>
                   </div>
                   <div>
                     <label className="text-xs text-zinc-500">Exame</label>
                     <Select value={selectedExam} onValueChange={setSelectedExam}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {EXAMS.map(e => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}
                        </SelectContent>
                     </Select>
                   </div>
                 </div>
                 <div className="p-4 bg-zinc-800 rounded text-sm space-y-2">
                    <p><span className="text-zinc-500">Condição:</span> {currentPatient?.condition}</p>
                    <p><span className="text-zinc-500">Biotipo:</span> {currentPatient?.biotype}</p>
                    <p><span className="text-zinc-500">Protocolo:</span> {currentExam?.name}</p>
                 </div>
               </div>
             </DialogContent>
          </Dialog>

          <Button 
            variant="ghost" 
            size="icon" 
            className="text-zinc-400"
            onClick={() => setLayout(l => l === 'split' ? 'full' : 'split')}
          >
            {layout === 'split' ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          
          {/* Left: Visualization (Gantry + Image) */}
          <ResizablePanel defaultSize={75} minSize={50}>
            <div className="h-full flex flex-col">
              {/* 3D Gantry View */}
              <div className="flex-1 relative border-b border-zinc-800">
                <div className="absolute top-4 left-4 z-10 bg-black/50 px-2 py-1 rounded text-xs text-white font-mono">
                  CÂMERA SALA 1
                </div>
                <GantryView isActive={isScanning} machineId={selectedMachine} />
              </div>
              
              {/* Image Preview Area */}
              <div className="h-1/2 bg-black relative flex items-center justify-center">
                {scanResult ? (
                  <div className="relative w-full h-full flex items-center justify-center p-4">
                    <div 
                      className="aspect-square h-full bg-zinc-900 rounded overflow-hidden relative filter contrast-125"
                      style={{ 
                        filter: `contrast(${100 + (scanResult.kv - 100)}%) brightness(${scanResult.mas / 200})`
                      }}
                    >
                      {/* Simulated CT Slice */}
                      <img 
                        src="https://prod-images-static.radiopaedia.org/images/53331070/6500057209672049e614949504c568_gallery.jpeg" 
                        alt="CT Scan" 
                        className="w-full h-full object-contain opacity-80"
                      />
                      <div className="absolute top-2 left-2 text-[10px] text-green-400 font-mono space-y-1">
                        <p>{currentPatient?.name}</p>
                        <p>{currentExam?.name}</p>
                        <p>kV: {scanResult.kv} mA: {scanResult.mas}</p>
                        <p>Slice: {scanResult.thickness}mm</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-zinc-600 flex flex-col items-center gap-2">
                    <Settings className="w-10 h-10 opacity-20" />
                    <p className="text-sm">Aguardando aquisição...</p>
                  </div>
                )}
              </div>
            </div>
          </ResizablePanel>
          
          <ResizableHandle className="bg-zinc-800" />

          {/* Right: Control Panel */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
            <ControlPanel 
              machineId={selectedMachine} 
              onScan={handleScan}
              isScanning={isScanning}
            />
          </ResizablePanel>

        </ResizablePanelGroup>
      </div>

      <VirtualTutor />
    </div>
  );
}
