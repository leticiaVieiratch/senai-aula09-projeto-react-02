import React from 'react';

/**
 * Componente Rodape
 * Créditos acadêmicos e metadados institucionais
 */
export default function Rodape() {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-950 py-6 px-4 text-center text-xs text-slate-500">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>SENAI • Especialização Técnica em Frameworks Front-End • 2026</p>
        <p className="font-mono text-cyan-400">Atividade 05: useState, useEffect, Formulários, APIs & React Router</p>
        <p>Docente: <strong>Prof. Me. Deivison S. Takatu</strong></p>
      </div>
    </footer>
  );
}
