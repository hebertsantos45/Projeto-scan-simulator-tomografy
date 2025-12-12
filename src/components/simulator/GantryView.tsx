import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GantryViewProps {
  isActive: boolean;
  machineId: string;
}

export default function GantryView({ isActive, machineId }: GantryViewProps) {
  return (
    <div className="relative w-full h-full bg-slate-900 overflow-hidden flex items-center justify-center perspective-1000">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 to-slate-950" />
      
      {/* Floor Grid */}
      <div className="absolute bottom-0 w-full h-1/2 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [transform:rotateX(60deg)] origin-bottom" />

      {/* Gantry Model Representation */}
      <motion.div 
        className="relative z-10"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      >
        {/* The Gantry Ring */}
        <div className={cn(
          "w-96 h-96 rounded-full border-[40px] shadow-2xl flex items-center justify-center relative transition-colors duration-500",
          machineId === 'siemens' ? "border-slate-300 bg-slate-800" :
          machineId === 'ge' ? "border-zinc-200 bg-zinc-100" :
          "border-gray-200 bg-white"
        )}>
          {/* Inner Bore */}
          <div className="w-64 h-64 rounded-full bg-black shadow-inner relative overflow-hidden">
             {/* Laser lights */}
             <div className="absolute top-1/2 left-0 w-full h-[1px] bg-red-500/50 shadow-[0_0_10px_red]" />
             <div className="absolute top-0 left-1/2 w-[1px] h-full bg-red-500/50 shadow-[0_0_10px_red]" />
             
             {/* X-Ray Animation inside bore */}
             {isActive && (
               <motion.div 
                 className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
                 animate={{ rotate: 360 }}
                 transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
               />
             )}
          </div>
          
          {/* Brand Logo Placeholder */}
          <div className="absolute top-4 font-bold text-xs tracking-widest opacity-50">
            {machineId.toUpperCase()}
          </div>
        </div>

        {/* Patient Table */}
        <motion.div 
          className="absolute top-1/2 left-1/2 w-40 h-96 bg-slate-700 -translate-x-1/2 -translate-y-1/2 rounded-t-lg shadow-xl origin-bottom"
          style={{ zIndex: 5, transform: 'translate(-50%, 20%) perspective(500px) rotateX(60deg)' }}
          animate={isActive ? { y: -50 } : { y: 0 }}
          transition={{ duration: 4 }}
        >
           <div className="w-full h-full bg-blue-900/30 flex items-center justify-center">
              <div className="text-white/20 text-xs rotate-180">Patient Table</div>
           </div>
        </motion.div>
      </motion.div>

      {/* Status Lights */}
      <div className="absolute top-8 right-8 flex gap-2">
        <div className={cn("w-4 h-4 rounded-full transition-colors", isActive ? "bg-yellow-500 animate-pulse shadow-[0_0_15px_yellow]" : "bg-green-900")} />
        <div className="text-xs text-white font-mono">{isActive ? 'X-RAY ON' : 'READY'}</div>
      </div>
    </div>
  );
}
