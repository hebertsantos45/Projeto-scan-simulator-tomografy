import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, AlertTriangle, RotateCw, Settings2, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MACHINES } from '@/data/mockData';

interface ControlPanelProps {
  machineId: string;
  onScan: (params: any) => void;
  isScanning: boolean;
}

export default function ControlPanel({ machineId, onScan, isScanning }: ControlPanelProps) {
  const machine = MACHINES.find(m => m.id === machineId) || MACHINES[0];
  
  const [kv, setKv] = useState(120);
  const [mas, setMas] = useState(200);
  const [pitch, setPitch] = useState(1.0);
  const [fov, setFov] = useState(250);
  const [thickness, setThickness] = useState(5);
  const [autoMa, setAutoMa] = useState(true);

  // Reset values when machine changes
  useEffect(() => {
    setKv(120);
    setMas(200);
  }, [machineId]);

  const handleScan = () => {
    onScan({ kv, mas, pitch, fov, thickness, autoMa });
  };

  const doseIndex = (mas * (kv/100)**2) / pitch; // Fake CTDI calculation
  const doseColor = doseIndex > 400 ? 'text-red-500' : doseIndex > 250 ? 'text-yellow-500' : 'text-green-500';

  return (
    <div className={cn("h-full flex flex-col border-t md:border-l md:border-t-0 shadow-xl transition-colors duration-500", machine.color, machine.textColor)}>
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-lg">{machine.name}</h2>
          <p className="text-xs opacity-70">Console de Operação</p>
        </div>
        <div className={cn("px-2 py-1 rounded text-xs font-bold text-white", machine.accentColor)}>
          {machine.brand.toUpperCase()}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-6">
        
        {/* Scan Parameters */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label className="font-semibold flex items-center gap-2">
                <Zap className="w-4 h-4" /> kV (Kilovoltagem)
              </Label>
              <span className="font-mono text-lg">{kv} kV</span>
            </div>
            <Slider 
              value={[kv]} 
              min={80} 
              max={140} 
              step={10} 
              onValueChange={(v) => setKv(v[0])}
              className="py-2"
            />
            <div className="flex justify-between text-xs opacity-50">
              <span>80</span>
              <span>100</span>
              <span>120</span>
              <span>140</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <Label className="font-semibold">mAs (Miliamperagem)</Label>
              <span className="font-mono text-lg">{mas} mAs</span>
            </div>
            <Slider 
              value={[mas]} 
              min={50} 
              max={500} 
              step={10} 
              onValueChange={(v) => setMas(v[0])} 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Pitch</Label>
              <Select value={pitch.toString()} onValueChange={(v) => setPitch(parseFloat(v))}>
                <SelectTrigger className="bg-white/10 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5">0.5 (High Res)</SelectItem>
                  <SelectItem value="0.8">0.8 (Standard)</SelectItem>
                  <SelectItem value="1.0">1.0 (Standard)</SelectItem>
                  <SelectItem value="1.5">1.5 (Fast)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Espessura (mm)</Label>
              <Select value={thickness.toString()} onValueChange={(v) => setThickness(parseFloat(v))}>
                <SelectTrigger className="bg-white/10 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.6">0.6 mm</SelectItem>
                  <SelectItem value="1.0">1.0 mm</SelectItem>
                  <SelectItem value="2.5">2.5 mm</SelectItem>
                  <SelectItem value="5.0">5.0 mm</SelectItem>
                  <SelectItem value="10.0">10.0 mm</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="space-y-0.5">
              <Label className="text-base">Modulação de Dose</Label>
              <p className="text-xs opacity-70">Ajuste automático de mA (CareDose/SmartmA)</p>
            </div>
            <Switch checked={autoMa} onCheckedChange={setAutoMa} />
          </div>
        </div>

        {/* Dose Monitor */}
        <div className="mt-8 p-4 rounded-lg bg-black/40 border border-white/10">
          <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-500" /> Estimativa de Dose
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="opacity-60">CTDIvol (mGy)</p>
              <p className={cn("text-xl font-mono font-bold", doseColor)}>{(doseIndex / 10).toFixed(2)}</p>
            </div>
            <div>
              <p className="opacity-60">DLP (mGy.cm)</p>
              <p className="text-xl font-mono font-bold">{(doseIndex * 2.5).toFixed(1)}</p>
            </div>
          </div>
        </div>

      </div>

      {/* Action Footer */}
      <div className="p-4 border-t border-white/10 bg-black/20">
        <Button 
          size="lg" 
          className={cn("w-full h-14 text-lg font-bold shadow-lg transition-all", 
            isScanning ? "bg-red-500 hover:bg-red-600 animate-pulse" : machine.accentColor
          )}
          onClick={handleScan}
          disabled={isScanning}
        >
          {isScanning ? (
            <span className="flex items-center gap-2"><RotateCw className="animate-spin" /> ADQUIRINDO...</span>
          ) : (
            <span className="flex items-center gap-2"><Play className="fill-current" /> INICIAR SCAN</span>
          )}
        </Button>
      </div>
    </div>
  );
}
