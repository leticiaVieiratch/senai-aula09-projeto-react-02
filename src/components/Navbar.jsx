import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Componente Navbar
 * Demonstra navegação SPA com Link do React Router sem recarregar a página
 */
export default function Navbar() {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Notas & Tarefas', icon: '📝' },
    { to: '/nova-nota', label: '+ Nova Nota', icon: '➕' },
    { to: '/api-demo', label: 'Consumo de API', icon: '🌐' },
    { to: '/sobre', label: 'Conceitos & Hooks', icon: '📚' },
  ];

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md bg-slate-900/90 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        
        {/* Marca / Identificação */}
        <Link to="/" className="flex items-center gap-3 text-white hover:opacity-90 transition-opacity">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-md shadow-cyan-500/20 ring-1 ring-white/20">
            ⚛
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight">DevPulse Notes</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Hooks & Router
              </span>
            </div>
            <p className="text-[11px] text-slate-400">SENAI Frameworks Front-End • Prof. Me. Deivison S. Takatu</p>
          </div>
        </Link>

        {/* Links de Rota (React Router Link) */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>

      </div>
    </nav>
  );
}
