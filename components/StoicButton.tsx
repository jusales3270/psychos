
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'terracotta';
  className?: string;
  disabled?: boolean;
}

export const StoicButton: React.FC<ButtonProps> = ({ 
  onClick, 
  children, 
  variant = 'primary', 
  className = '',
  disabled = false
}) => {
  const baseStyles = "px-8 py-4 rounded-sm transition-all duration-500 font-sans tracking-wide text-sm uppercase font-medium disabled:opacity-50";
  
  const variants = {
    primary: "bg-stoic-charcoal text-stoic-paper hover:bg-black",
    secondary: "bg-stoic-gold text-stoic-paper hover:opacity-90",
    outline: "border border-stoic-charcoal text-stoic-charcoal hover:bg-stoic-charcoal hover:text-stoic-paper",
    terracotta: "bg-stoic-terracotta text-stoic-paper hover:opacity-90"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
