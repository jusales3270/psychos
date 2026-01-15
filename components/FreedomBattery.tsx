
import React from 'react';

interface Props {
  percentage: number;
  label: string;
  subLabel: string;
}

export const FreedomBattery: React.FC<Props> = ({ percentage, label, subLabel }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-3xl font-serif text-stoic-charcoal">{label}</h2>
          <p className="text-xs font-mono uppercase text-stoic-charcoal/60 tracking-widest mt-1">{subLabel}</p>
        </div>
        <span className="text-xl font-mono text-stoic-gold">{percentage}%</span>
      </div>
      <div className="w-full h-12 bg-stoic-border rounded-none relative overflow-hidden border border-stoic-border/50">
        <div 
          className="h-full bg-stoic-gold transition-all duration-1000 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
        {/* Subtle segments */}
        <div className="absolute inset-0 flex justify-between px-1 pointer-events-none">
           {[...Array(10)].map((_, i) => (
             <div key={i} className="h-full w-[1px] bg-stoic-paper/20" />
           ))}
        </div>
      </div>
    </div>
  );
};
