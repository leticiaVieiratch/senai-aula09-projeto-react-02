import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

/**
 * Página DetalheNota
 * Demonstra o Hook useParams() para rotas dinâmicas (/nota/:id) e useEffect com dependência [id]
 */
export default function DetalheNota({ notas, aoExcluirNota }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nota, setNota] = useState(null);

  // Efeito disparado na montagem e sempre que o parâmetro 'id' da URL mudar
  useEffect(() => {
    const encontrada = notas.find(n => n.id === id);
    if (encontrada) {
      setNota(encontrada);
      document.title = `Nota: ${encontrada.titulo}`;
    } else {
      setNota(null);
      document.title = 'Nota não encontrada - DevPulse';
    }
  }, [id, notas]);

  const handleDelete = () => {
    if (confirm('Tem certeza que deseja excluir esta nota?')) {
      aoExcluirNota(id);
      navigate('/');
    }
  };

  if (!nota) {
    return (
      <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center shadow-xl space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-400 mx-auto flex items-center justify-center text-2xl font-bold">
          ✕
        </div>
        <h2 className="text-xl font-bold text-white">Nota não encontrada</h2>
        <p className="text-sm text-slate-400">
          O identificador <code>{id}</code> não corresponde a nenhuma nota registrada na base local.
        </p>
        <Link
          to="/"
          className="inline-block px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold border border-slate-700 transition-colors"
        >
          &larr; Voltar para a Lista de Notas
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Topo / Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link to="/" className="text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
          <span>&larr;</span> Voltar para o Painel
        </Link>
        <span className="text-xs text-slate-500 font-mono">Rota Dinâmica: /nota/{id}</span>
      </div>

      {/* Cartão de Detalhes Completo */}
      <article className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Metadados e Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
              {nota.categoria}
            </span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${
              nota.prioridade === 'Alta' 
                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                : nota.prioridade === 'Média'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
            }`}>
              Prioridade {nota.prioridade}
            </span>
          </div>

          <div className="text-xs font-mono text-slate-500">
            ID: {nota.id} • Criado em: {new Date(nota.criadoEm).toLocaleString('pt-BR')}
          </div>
        </div>

        {/* Título e Texto Integral */}
        <div className="space-y-4">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            {nota.titulo}
          </h1>
          <div className="bg-slate-950/70 rounded-2xl p-5 border border-slate-800 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
            {nota.texto}
          </div>
        </div>

        {/* Painel Explicativo sobre useParams() */}
        <div className="bg-slate-950/40 rounded-xl p-3.5 border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <span className="font-bold text-cyan-400 uppercase tracking-wide block">Conceito-Chave: useParams()</span>
          <p>
            O Hook <code>useParams()</code> do React Router extrai os parâmetros dinâmicos da URL definidos na rota <code>/nota/:id</code>. Isso permite que uma única tela apresente dados contextuais de diferentes registros sem recarregar o documento.
          </p>
        </div>

        {/* Ações */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <Link
            to="/"
            className="text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
          >
            &larr; Ver todas as notas
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <span>🗑</span>
            <span>Excluir Nota</span>
          </button>
        </div>

      </article>

    </div>
  );
}
